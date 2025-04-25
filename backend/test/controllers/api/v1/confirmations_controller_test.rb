# frozen_string_literal: true

require 'test_helper'

module Api
  module V1
    # Test suite for the ConfirmationsController in the API V1 namespace.
    class ConfirmationsControllerTest < ActionDispatch::IntegrationTest
      include ActionMailer::TestHelper

      setup do
        @user = FactoryBot.create(:user)
        ActionMailer::Base.deliveries.clear # ensure mails count starts at zero
      end

      # Helper to parse JSON responses
      def json_body
        response.parsed_body
      end

      # Helper: send a confirmation email, optionally back-dating the sent_at timestamp.
      def generate_token(backdate: nil)
        @user.send_confirmation_email!
        @user.email_confirmation.tap do |ec|
          ec.update!(sent_at: backdate.ago) if backdate
        end.token
      end

      # ------------------------------------------------------------
      # POST /api/v1/confirmations
      # ------------------------------------------------------------
      test 'POST /api/v1/confirmations returns no content and sends one email for a known email' do
        assert_emails 1 do
          post api_v1_confirmations_path, params: { email: @user.email }, as: :json
        end
        assert_response :no_content
      end

      test 'POST /api/v1/confirmations returns no content and sends no email for an unknown email' do
        assert_no_emails do
          post api_v1_confirmations_path, params: { email: 'ghost@nowhere.test' }, as: :json
        end
        assert_response :no_content
      end

      # ------------------------------------------------------------
      # GET /api/v1/confirm?token=XYZ
      # ------------------------------------------------------------
      test 'GET /api/v1/confirm with a valid token confirms the address' do
        token = generate_token

        get api_v1_confirm_path, params: { token: token }

        assert_response :ok
        assert_equal 'Email confirmed.', json_body['message']
        assert_not_nil @user.reload.email_confirmation.confirmed_at
      end

      test 'GET /api/v1/confirm with an invalid token returns unprocessable_entity' do
        get api_v1_confirm_path, params: { token: 'bogus' }

        assert_response :unprocessable_entity
        assert_match(/Invalid or expired token/i, json_body['error'])
      end

      test 'GET /api/v1/confirm with an expired token returns unprocessable_entity' do
        token = generate_token(backdate: 2.days)

        get api_v1_confirm_path, params: { token: token }

        assert_response :unprocessable_entity
        assert_match(/Invalid or expired token/i, json_body['error'])
      end
    end
  end
end
