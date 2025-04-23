# frozen_string_literal: true

require 'active_support/core_ext/integer/time'

def configure_general_settings(config)
  config.cache_classes = false
  config.eager_load = false
  config.consider_all_requests_local = true
  config.server_timing = true
end

def configure_active_job(config)
  config.active_job.queue_adapter = :inline
end

def configure_caching(config)
  if Rails.root.join('tmp/caching-dev.txt').exist?
    config.cache_store = :memory_store
    config.public_file_server.headers = {
      'Cache-Control' => "public, max-age=#{2.days.to_i}"
    }
  else
    config.action_controller.perform_caching = false
    config.cache_store = :null_store
  end
end

def configure_active_storage(config)
  config.active_storage.service = :local
end

def configure_action_mailer(config)
  config.action_mailer.raise_delivery_errors = false
  config.action_mailer.perform_caching = false
  config.action_mailer.delivery_method = :letter_opener
  config.action_mailer.perform_deliveries = true
  config.action_mailer.default_url_options = { host: 'localhost', port: 3000 }
end

def configure_active_record(config)
  config.active_support.deprecation = :log
  config.active_support.disallowed_deprecation = :raise
  config.active_support.disallowed_deprecation_warnings = []
  config.active_record.migration_error = :page_load
  config.active_record.verbose_query_logs = true
end

def configure_session_store(config)
  config.session_store :cookie_store, key: '_rifftube_session'
  config.middleware.use ActionDispatch::Cookies
  config.middleware.use ActionDispatch::Session::CookieStore, config.session_options
end
# --- Main configuration ---
Rails.application.configure do
  configure_general_settings(config)
  configure_active_job(config)
  configure_caching(config)
  configure_active_storage(config)
  configure_action_mailer(config)
  configure_active_record(config)
  configure_session_store(config)
end
