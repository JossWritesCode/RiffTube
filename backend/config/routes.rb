# frozen_string_literal: true

Rails.application.routes.draw do
  namespace :api do
    namespace :v1 do
      # ─── USERS ────────────────────────────────────────────
      post 'signup', to: 'users#signup'    # POST   /api/v1/signup
      get  'me',     to: 'users#me'        # GET    /api/v1/me

      # ─── SESSIONS ─────────────────────────────────────────
      post   'login',  to: 'sessions#create'   # POST   /api/v1/login
      delete 'logout', to: 'sessions#destroy'  # DELETE /api/v1/logout

      # ─── OAUTH ───────────────────────────────────────────
      get 'auth/google_oauth2/callback', to: 'sessions#google_oauth2_callback'
    end
  end
end
