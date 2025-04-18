# frozen_string_literal: true

FactoryBot.define do
  factory :comment do
    association :user
    association :commentable, factory: :riff
    content { 'Test comment content' }
  end
end
