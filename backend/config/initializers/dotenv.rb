# frozen_string_literal: true

# Only use dotenv when not in production mode
if Rails.env.development? || Rails.env.test?
  require 'dotenv'

root_env = File.expand_path('../../../.env', __dir__)
Dotenv.load(root_env) if File.exist?(root_env)


  # Enforce required keys in development and test environments
  Dotenv.require_keys(
    'DATABASE_USERNAME',
    'DATABASE_PASSWORD',
    'DATABASE_HOST',
    'DATABASE_PORT'
  )
end
