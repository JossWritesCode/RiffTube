FactoryBot.define do
    factory :riff do
      association :creator, factory: :user
      title { "Test Riff" }
      current_version { 1 }
    end
  end
  