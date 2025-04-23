# frozen_string_literal: true

module Api
  module V1
    # Handles e-mail confirmation flows:
    #   • POST /api/v1/confirmations        → (re)send confirmation link
    #   • GET  /api/v1/confirm?token=XYZ   → mark e-mail as confirmed
    #
    # Always returns 204 for the “fire-and-forget” resend action to avoid
    # leaking whether an address exists. Confirmation returns 200 on success
    # and 422 on invalid / expired tokens.
    class ConfirmationsController < ApplicationController
      wrap_parameters false
      ## POST /api/v1/confirmations
      #
      # Body:
      #   { "email": "user@example.com" }
      #
      # Silently succeeds even if the e-mail isn’t in our DB.
      def create
        if (user = User.find_by(email: email_param))
          user.send_confirmation_email!
        end

        head :no_content
      end

      ## GET /api/v1/confirm?token=XYZ
      def confirm
        confirmation = EmailConfirmation.find_by(token: token_param)

        if confirmation&.user&.confirm_email!(token_param)
          render json: { message: 'Email confirmed.' }, status: :ok
        else
          render json: { error: 'Invalid or expired token' },
                 status: :unprocessable_entity
        end
      end

      private

      # ── Param helpers ────────────────────────────────────────────
      def email_param
        params[:email].to_s.strip.downcase
      end

      def token_param
        params[:token].to_s
      end
    end
  end
end
