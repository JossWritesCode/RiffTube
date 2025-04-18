# frozen_string_literal: true

FactoryBot.define do
  factory :project do
    title      { 'My Project' }
    video_host { 'youtube' }
    owner      { association :user }
  end
end
