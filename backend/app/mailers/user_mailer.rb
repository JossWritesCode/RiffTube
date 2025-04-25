# frozen_string_literal: true

# UserMailer is responsible for sending emails to users, such as
# email confirmation and password reset links.
class UserMailer < ApplicationMailer
  default from: 'no-reply@rifftube.app'

  def confirmation_email(user)
    @user  = user
    @token = user.email_confirmation.token
    mail(
      to: @user.email,
      subject: 'Please confirm your RiffTube email'
    )
  end

  def password_reset_email(user)
    @user  = user
    @token = user.password_reset_token
    mail(
      to: @user.email,
      subject: 'Your RiffTube password reset link'
    )
  end
end
