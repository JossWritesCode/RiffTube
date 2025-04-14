require 'dotenv'

# Load the root .env file
root_env = File.expand_path('../../../.env', __dir__)  # three “..” segments
Dotenv.load(root_env) if File.exist?(root_env)

# Enforce required keys in development and test environments
if Rails.env.development? || Rails.env.test?
  Dotenv.require_keys(
    'DATABASE_USERNAME',
    'DATABASE_PASSWORD',
    'DATABASE_HOST',
    'DATABASE_PORT'
  )
end
