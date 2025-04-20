# frozen_string_literal: true

require 'test_helper'

module Api
  module V1
    # Test suite for the SessionsController in the API V1 namespace.
    class SessionsControllerTest < ActionDispatch::IntegrationTest
      # Helpers
      def json_body
        return if response.body.blank?

        JSON.parse(response.body)
      end

      def log_in(user, password = 'secret123')
        post '/api/v1/login', params: { email: user.email, password: password }
      end

      # ─── Happy path ──────────────────────────────────────────
      test 'login succeeds with valid credentials' do
        user = create(:user, email: 'foo@bar.com', password: 'secret123')

        log_in(user)

        assert_response :ok
        assert_equal user.id, session[:user_id]

        json = json_body
        assert_equal user.email, json['user']['email']
        assert_not json['user'].key?('password_digest')
      end

      test 'login is case‑insensitive for email' do
        user = create(:user, email: 'foo@bar.com', password: 'secret123')

        post '/api/v1/login', params: { email: 'FOO@BAR.COM', password: 'secret123' }

        assert_response :ok
        assert_equal user.id, session[:user_id]
      end

      # ─── Failure cases ───────────────────────────────────────
      test 'login fails when credentials missing or blank' do
        post '/api/v1/login', params: { email: '', password: '' }

        assert_response :bad_request
        assert_match(/required/i, json_body['error'])
      end

      test 'login fails with non‑existent user' do
        post '/api/v1/login', params: { email: 'nope@example.com', password: 'whatever' }

        assert_response :unauthorized
        assert_match(/invalid/i, json_body['error'])
      end

      test 'login fails with wrong password' do
        user = create(:user, password: 'correct')

        post '/api/v1/login', params: { email: user.email, password: 'wrong' }

        assert_response :unauthorized
        assert_match(/invalid/i, json_body['error'])
      end

      test 'login fails for soft‑deleted user' do
        password = 'correct'
        user = create(:user, password: password)
        user.update!(deleted_at: Time.current)

        post '/api/v1/login', params: { email: user.email, password: password }

        assert_response :unauthorized
      end
    end
  end
end
