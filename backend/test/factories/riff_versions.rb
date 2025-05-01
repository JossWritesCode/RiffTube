# frozen_string_literal: true

FactoryBot.define do
  factory :riff_version do
    version_number { 0 }
    text_content { 'Foobar is funny' }
    association :media_file
    audio_source { 'recorded' }
    tts_config { nil }
    styling { nil }
  end
end
