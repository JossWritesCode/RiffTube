Rails.application.config.middleware.use OmniAuth::Builder do
  provider :google_oauth2,
           ENV['GOOGLE_CLIENT_ID'],
           ENV['GOOGLE_CLIENT_SECRET'],
           {
             prompt: 'select_account',
             scope: 'email,profile',
             access_type: 'offline',
             redirect_uri: 'http://localhost:3000/api/v1/auth/google_oauth2/callback',
             callback_path: '/api/v1/auth/google_oauth2/callback'
           }
end
OmniAuth.config.allowed_request_methods = %i[get]
# OmniAuth.config.full_host = Rails.env.production? ? 'https://domain.com' : 'http://localhost:3000'
OmniAuth.config.logger = Rails.logger
# https://github.com/zquestz/omniauth-google-oauth2?tab=readme-ov-file#one-time-code-flow-hybrid-authentication
# OmniAuth.config.provider_ignores_state = true
