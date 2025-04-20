# frozen_string_literal: true

require_relative 'boot'

require 'rails'
# Pick the frameworks you want:
require 'active_model/railtie'
require 'active_job/railtie'
require 'active_record/railtie'
require 'active_storage/engine'
require 'action_controller/railtie'
require 'action_mailer/railtie'
require 'action_view/railtie'
# require 'action_mailbox/engine'
# require 'action_text/engine'
# require 'action_cable/engine'
# require "rails/test_unit/railtie"
require 'logger'

Bundler.require(*Rails.groups)

# Load environment variables from .env file if it exists
Dotenv::Rails.files.unshift('../.env') if defined?(Dotenv)

module BackEnd
  # The BackEnd module serves as the namespace for the application.
  # The Application class configures the Rails application settings.
  class Application < Rails::Application
    config.load_defaults 7.0
    config.api_only = true

    # Use UUIDs for primary keys by default
    config.generators do |g|
      g.orm :active_record, primary_key_type: :uuid
    end
    # ────────────────── Cookies & Session Middleware ──────────────────
    config.middleware.use ActionDispatch::Cookies
    config.middleware.use ActionDispatch::Session::CookieStore,
                          key: ENV.fetch('RIFFTUBE_SESSION_KEY', '_rifftube_session'),
                          secure: Rails.env.production?,
                          httponly: true,
                          same_site: :lax
    # ────────────────────────── Optional Settings ──────────────────────────
    # config.time_zone = 'UTC'
    #
    # If you need CORS for cross-origin requests, e.g. React front-end:
    # config.middleware.insert_before 0, Rack::Cors do
    #   allow do
    #     origins 'your-frontend-domain.com'
    #     resource '*', headers: :any, methods: [:get, :post, :patch, :put, :delete, :options]
    #   end
    # end
  end
end
