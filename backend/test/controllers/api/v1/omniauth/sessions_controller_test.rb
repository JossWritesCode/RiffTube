# frozen_string_literal: true

require 'test_helper'

# Tests for OmniAuth
class OmniAuth::SessionsControllerTest < ActionDispatch::IntegrationTest
  setup do
    OmniAuth.config.test_mode = true
  end

  test 'a user can sign up with a Google account' do
    OmniAuth.config.mock_auth[:google_oauth2] = OmniAuth::AuthHash.new(
      {
        provider: 'google',
        uid: '1234567890',
        info: {
          email: 'test@example.com',
          name: 'Test User'
        }
      }
    )

    assert_difference('User.count', 1) do
      get '/api/v1/auth/google_oauth2/callback'
    end

    assert_redirected_to '/api/v1/me'
  end
end
