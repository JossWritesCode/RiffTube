# frozen_string_literal: true

module Api
  module V1
    # Manages login (create session) and logout (destroy session) actions.
    class SessionsController < ApplicationController
      include Authenticatable
      include ResponseRenderable

      # Pass off authorizing process to OmniAuth
      def google_oauth2_redirect
        redirect_to '/auth/google_oauth2'
      end

      # OmniAuth callback (receive authorization)
      def google_oauth2_callback
        user = find_or_init_user

        if user.persisted?
          # If user exists, log in
          log_in_and_redirect user
        elsif user.save
          # If user doesn't exist, but saving succeeds, log in
          setup_new_user user, auth.info
          log_in_and_redirect user
        else
          # If user doesn't exist and can't be created, fail
          render_unprocessable(user)
        end
      end

      # Log in user with credentials
      def create
        return render_missing_credentials if blank_credentials?

        user = User.active.find_by(email: normalized_email)
        return render_invalid_credentials unless user&.authenticate(session_params[:password])

        log_in(user)
        render_ok(user)
      end

      # Log out user
      def destroy
        log_out
        head :no_content
      end

      private

      # ——— OAuth Helpers ————————————————————————————
      def setup_new_user(user, auth_info)
        user.email    = auth_info.email
        user.name     = auth_info.name
        user.username = auth_info.email.split('@').first
        user.password = SecureRandom.hex(16) # unused
      end

      def auth
        request.env['omniauth.auth']
      end

      def find_or_init_user
        User.active.find_or_initialize_by(
          provider: 'google',
          uid: auth.uid
        )
      end

      def log_in_and_redirect(user)
        log_in(user)
        redirect_to dashboard_path
      end

      # ——— Params & normalization ————————————————————————————
      def session_params
        params.permit(:email, :password)
      end

      def normalized_email
        session_params[:email].to_s.downcase.strip
      end

      # ——— Predicates ————————————————————————————————
      def blank_credentials?
        normalized_email.blank? || session_params[:password].blank?
      end

      # ——— Error renderers ——————————————————————————————
      def render_missing_credentials
        render json: { error: 'Email and password are required' },
               status: :bad_request
      end

      def render_invalid_credentials
        Rails.logger.warn "Failed login for #{normalized_email}"
        render json: { error: 'Invalid email or password' },
               status: :unauthorized
      end
    end
  end
end
