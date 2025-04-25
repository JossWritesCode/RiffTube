# frozen_string_literal: true

module Api
  module V1
    # Handles password-reset requests:
    #   • POST   /api/v1/password_resets        → send reset link
    #   • PATCH  /api/v1/password_resets/:token → set new password
    #
    # Always returns 204 for “fire-and-forget” actions (create / success update)
    # to minimise information leakage. Token problems return 401.
    class PasswordResetsController < ApplicationController
      ## POST /api/v1/password_resets
      #
      # Body:
      # {
      #   "email": "user@example.com"
      # }
      #
      # Silently succeeds even if the email is unknown, for security.
      def create
        if (user = User.find_by(email: normalized_email))
          user.generate_password_reset!
          UserMailer.password_reset_email(user).deliver_later
        end

        head :no_content
      end

      ## PATCH /api/v1/password_resets/:token
      #
      # Body:
      # {
      #   "password": "new_password"
      # }
      #
      # Token must be valid & unexpired; password must satisfy validations.
      def update
        user = User.find_by(password_reset_token: token_param)

        return render_invalid_token unless user&.password_reset_valid?(token_param)

        if user.update(password: password_param)
          user.clear_password_reset!
          head :no_content
        else
          render json: { errors: user.errors.full_messages },
                 status: :unprocessable_entity
        end
      end

      private

      # ── Strong-param helpers ────────────────────────────────────────────
      def password_reset_params
        params.permit(:email, :password, :token)
      end

      def normalized_email
        password_reset_params[:email].to_s.strip.downcase
      end

      def password_param
        password_reset_params[:password]
      end

      def token_param
        params[:token].to_s
      end

      # ── Error helpers ───────────────────────────────────────────────────
      def render_invalid_token
        render json: { error: 'Invalid or expired token' }, status: :unauthorized
      end
    end
  end
end
