Rails.application.routes.draw do
  namespace :api do
    namespace :v1 do
      # ─── AUTHENTICATION ─────────────────────────────
      post   'signup', to: 'users#signup'     # Register a new user
      post   'login',  to: 'users#login'      # Log in an existing user
      delete 'logout', to: 'users#logout'     # Log out current user
      get    'me',     to: 'users#me'         # Get current logged-in user info

      # ─── OAUTH ──────────────────────────────────────
      get 'auth/google_oauth2/callback', to: 'users#google_oauth2_callback' # OAuth callback for Google login
    end
  end
end
