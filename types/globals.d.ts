export {}

// Create a type for the roles
export type Roles = 'admin' | 'landlord' | 'user'

declare global {
  interface CustomJwtSessionClaims {
    metadata: {
      role?: Roles
    }
  }
}
