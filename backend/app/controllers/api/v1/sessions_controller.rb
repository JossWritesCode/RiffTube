# frozen_string_literal: true

module Api
  module V1
    # Manages login (create session) and logout (destroy session) actions.
    class SessionsController < ApplicationController
      include Authenticatable
      include ResponseRenderable

      def create
        return render_missing_credentials if blank_credentials?

        user = User.active.find_by(email: normalized_email)
        return render_invalid_credentials unless user&.authenticate(session_params[:password])

        log_in(user)
        render_ok(user)
      end

      def destroy
        log_out
        head :no_content
      end

      private

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
