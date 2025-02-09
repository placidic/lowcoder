export default {
  name: "Vault Plugin",
  description: "A plugin to interface with HashiCorp Vault",
  authMethod: {
    label: "Authentication Method",
    options: {
      ldap: "LDAP",
      token: "Token",
      appRole: "App Role",
      userpass: "Userpass"
    },
    requiredMessage: "Authentication method is required"
  },
  actions: {
    label: "Actions",
    read: "Read",
    write: "Write",
    delete: "Delete",
    list: "List"
  },
  secretPath: {
    label: "Secret Path",
    placeholder: "Enter the secret path"
  },
  data: {
    label: "Data",
    placeholder: "Enter the data to write"
  },
  endpoint: {
    label: "Vault Endpoint",
    placeholder: "https://vault.example.com:9200",
    requiredMessage: "Vault endpoint is required"
  },
  token: {
    label: "Vault Token",
    placeholder: "Enter the Vault token"
  },
  username: {
    label: "Username",
    placeholder: "Enter the username"
  },
  password: {
    label: "Password",
    placeholder: "Enter the password"
  },
  roleId: {
    label: "Role ID",
    placeholder: "Enter the role ID"
  },
  secretId: {
    label: "Secret ID",
    placeholder: "Enter the secret ID"
  }
};