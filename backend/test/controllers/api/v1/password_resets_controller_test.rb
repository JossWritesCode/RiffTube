# frozen_string_literal: true

require 'test_helper'

module Api
  module V1
    # Tests for the PasswordResetsController, which handles password reset requests.
    class PasswordResetsControllerTest < ActionDispatch::IntegrationTest
      include ActionMailer::TestHelper

      # ------------------------------------------------------------
      # setup
      # ------------------------------------------------------------
      setup do
        ActionMailer::Base.deliveries.clear
      end

      def json_body
        response.parsed_body
      end

      # ------------------------------------------------------------
      # POST /api/v1/password_resets
      # ------------------------------------------------------------
      test 'post /api/v1/password_resets delivers reset mail for known email' do
        user = create(:user, email: 'reset@example.com')

        assert_emails 1 do
          post api_v1_password_resets_path,
               params: { email: user.email },
               as: :json
        end

        assert_response :no_content
        user.reload
        assert_not_nil user.password_reset_token,       'Expected a reset token'
        assert_not_nil user.password_reset_sent_at,     'Expected a reset timestamp'
      end

      test 'post /api/v1/password_resets returns 204 and no mail for unknown email' do
        post api_v1_password_resets_path,
             params: { email: 'ghost@nowhere.test' },
             as: :json

        assert_response :no_content
        assert_equal 0, ActionMailer::Base.deliveries.size,
                     'No email should be sent for unknown email'
      end

      # ------------------------------------------------------------
      # PATCH /api/v1/password_resets/:token
      # ------------------------------------------------------------
      test 'patch /api/v1/password_resets/:token updates password for valid token' do
        user = create(:user, password: 'oldpassword')
        user.generate_password_reset!
        token = user.password_reset_token

        patch api_v1_password_reset_path(token: token),
              params: { password: 'newsecurepass' },
              as: :json

        assert_response :no_content
        user.reload
        assert_nil user.password_reset_token,
                   'Expected reset token to be cleared'
        assert user.authenticate('newsecurepass'),
               'User should authenticate with the new password'
      end

      test 'patch /api/v1/password_resets/:token returns 401 for invalid token' do
        bad_token = SecureRandom.hex(20) # 40 hex chars

        patch api_v1_password_reset_path(token: bad_token),
              params: { password: 'doesntmatter' },
              as: :json

        assert_response :unauthorized
        assert_match(/invalid or expired token/i, json_body['error'])
      end

      test 'patch /api/v1/password_resets/:token returns 422 for too-short password' do
        user = create(:user, password: 'oldpassword')
        user.generate_password_reset!
        token = user.password_reset_token

        patch api_v1_password_reset_path(token: token),
              params: { password: 'short' },
              as: :json

        assert_response :unprocessable_entity
        assert_not_empty json_body['errors'],
                         'Expected validation errors for weak password'
      end

      test 'patch /api/v1/password_resets/:token returns 401 for expired token' do
        user = create(:user, password: 'oldpassword')
        user.generate_password_reset!
        token = user.password_reset_token
        user.update!(password_reset_sent_at: 2.days.ago) # force expiry

        patch api_v1_password_reset_path(token: token),
              params: { password: 'newsecurepass' },
              as: :json

        assert_response :unauthorized
        assert_match(/invalid or expired token/i, json_body['error'])
      end
    end
  end
end
