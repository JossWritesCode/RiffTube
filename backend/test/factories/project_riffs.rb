# frozen_string_literal: true

FactoryBot.define do
  factory :project_riff do
    project           { association :project }
    riff              { association :riff }
    start_time        { 123.45 }
    end_time          { 126.78 }
    optional_settings { nil }
  end
end
