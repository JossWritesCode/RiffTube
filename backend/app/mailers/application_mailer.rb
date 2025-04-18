# frozen_string_literal: true

# ApplicationMailer is the base mailer class for the application.
# It sets default configurations for all mailers.
class ApplicationMailer < ActionMailer::Base
  default from: 'from@example.com'
  layout 'mailer'
end
