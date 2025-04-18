# frozen_string_literal: true

FactoryBot.define do
  factory :user do
    email                 { Faker::Internet.unique.email }
    password              { 'password123' }
    password_confirmation { 'password123' }
    username              { Faker::Internet.unique.username(specifier: 5..10, separators: %w[_]) }

    trait :oauth do
      provider { 'google' }
      uid      { SecureRandom.uuid }
      password { nil }
      password_confirmation { nil }
    end
  end
end
