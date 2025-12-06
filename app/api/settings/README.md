# Settings API

API routes for managing application settings with role-based access control.

## Routes

### GET /api/settings

Get all settings. Returns public settings for unauthenticated users, all settings for admins.

**Response:**
```json
{
  "success": true,
  "data": {
    "site_name": {
      "value": "Marsala.dev",
      "description": "The name of the website",
      "is_public": true,
      "updated_at": "2024-12-06T12:00:00Z"
    },
    "api_key": {
      "value": "secret-key",
      "description": "API key for external service",
      "is_public": false,
      "updated_at": "2024-12-06T12:00:00Z"
    }
  },
  "count": 2
}
```

### PUT /api/settings

Update multiple settings at once. Requires admin authentication.

**Request:**
```json
{
  "settings": {
    "site_name": {
      "value": "Marsala.dev",
      "description": "The name of the website",
      "is_public": true
    },
    "maintenance_mode": {
      "value": false,
      "description": "Enable/disable maintenance mode",
      "is_public": true
    }
  }
}
```

**Response:**
```json
{
  "success": true,
  "updated": 2,
  "data": [
    {
      "key": "site_name",
      "value": "Marsala.dev",
      "description": "The name of the website",
      "is_public": true,
      "updated_at": "2024-12-06T12:00:00Z",
      "updated_by": "user-id"
    }
  ]
}
```

### GET /api/settings/[key]

Get a single setting by key. Public settings available to all, private settings require admin.

**Example:** `GET /api/settings/site_name`

**Response:**
```json
{
  "success": true,
  "data": {
    "key": "site_name",
    "value": "Marsala.dev",
    "description": "The name of the website",
    "is_public": true,
    "updated_at": "2024-12-06T12:00:00Z"
  }
}
```

### PUT /api/settings/[key]

Update or create a single setting. Requires admin authentication.

**Example:** `PUT /api/settings/site_name`

**Request:**
```json
{
  "value": "Marsala.dev",
  "description": "The name of the website",
  "is_public": true
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "key": "site_name",
    "value": "Marsala.dev",
    "description": "The name of the website",
    "is_public": true,
    "updated_at": "2024-12-06T12:00:00Z",
    "updated_by": "user-id"
  },
  "message": "Setting updated successfully"
}
```

### DELETE /api/settings/[key]

Delete a setting. Requires admin authentication.

**Example:** `DELETE /api/settings/site_name`

**Response:**
```json
{
  "success": true,
  "message": "Setting deleted successfully"
}
```

## Authentication

- **Public access:** GET requests for public settings (where `is_public: true`)
- **Admin only:** All PUT and DELETE operations, and GET requests for private settings

Admin authentication is verified by checking:
1. Valid user session
2. User profile has `role: 'admin'`

## Error Responses

### 400 Bad Request
```json
{
  "error": "Invalid request body. Expected { settings: {...} }"
}
```

### 401 Unauthorized
```json
{
  "error": "Unauthorized. Admin access required."
}
```

### 403 Forbidden
```json
{
  "error": "Unauthorized. This setting is private."
}
```

### 404 Not Found
```json
{
  "error": "Setting not found"
}
```

### 500 Internal Server Error
```json
{
  "error": "An unexpected error occurred"
}
```

## Setting Schema

```typescript
interface Setting {
  key: string;           // Primary key, unique identifier
  value: Json;           // Any JSON value (string, number, boolean, object, array)
  description: string | null;  // Optional description
  is_public: boolean;    // Whether non-admin users can read this setting
  updated_at: string;    // ISO 8601 timestamp
  updated_by: string | null;   // User ID who last updated
}
```

## Usage Examples

### JavaScript/TypeScript

```typescript
// Get all public settings
const response = await fetch('/api/settings');
const { data } = await response.json();

// Get a specific setting
const response = await fetch('/api/settings/site_name');
const { data } = await response.json();

// Update a setting (admin only)
const response = await fetch('/api/settings/site_name', {
  method: 'PUT',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    value: 'New Site Name',
    description: 'Updated site name',
    is_public: true
  })
});

// Update multiple settings (admin only)
const response = await fetch('/api/settings', {
  method: 'PUT',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    settings: {
      site_name: { value: 'Marsala.dev', is_public: true },
      maintenance_mode: { value: false, is_public: true }
    }
  })
});

// Delete a setting (admin only)
const response = await fetch('/api/settings/old_setting', {
  method: 'DELETE'
});
```

### cURL

```bash
# Get all settings
curl https://marsala.dev/api/settings

# Get a specific setting
curl https://marsala.dev/api/settings/site_name

# Update a setting (with auth cookie)
curl -X PUT https://marsala.dev/api/settings/site_name \
  -H "Content-Type: application/json" \
  -d '{"value":"New Name","is_public":true}'

# Delete a setting (with auth cookie)
curl -X DELETE https://marsala.dev/api/settings/old_setting
```

## Database Table

The settings are stored in the `settings` table with the following structure:

```sql
CREATE TABLE settings (
  key TEXT PRIMARY KEY,
  value JSONB NOT NULL,
  description TEXT,
  is_public BOOLEAN DEFAULT FALSE,
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  updated_by UUID REFERENCES auth.users(id)
);
```

## Notes

- Settings values are stored as JSON, supporting strings, numbers, booleans, objects, and arrays
- The `is_public` flag controls visibility for non-admin users
- All updates track who made the change and when
- Batch updates use upsert, creating new settings or updating existing ones
- Use the admin client to bypass RLS for settings operations
