# frozen_string_literal: true

FactoryBot.define do
  factory :media_file do
    association :user
    provider      { 'gcs' }
    bucket        { 'test-bucket' }
    object_path   { "uploads/#{SecureRandom.uuid}.mp3" }
    public_url    { "https://storage.googleapis.com/test-bucket/#{object_path}" }
    file_type     { 'audio' }
    duration_seconds { 3.5 }
    size_bytes { 123_456 }
  end
end
