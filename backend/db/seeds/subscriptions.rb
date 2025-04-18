# frozen_string_literal: true

Rails.logger.info '🪪 Seeding subscription plans...'

subscriptions = [
  {
    name: 'Riffer',
    description: 'Ability to record and post your own riffs.',
    features: {
      can_watch: true,
      can_comment: true,
      can_record_riffs: true,
      can_synthesize_riffs: false,
      can_download: false
    }
  },
  {
    name: 'Super Riffer',
    description: 'Record, synthesize, and download riffs in HD glory.',
    features: {
      can_watch: true,
      can_comment: true,
      can_record_riffs: true,
      can_synthesize_riffs: true,
      can_download: true
    }
  }
]

subscriptions.each do |sub_data|
  Subscription.find_or_create_by!(name: sub_data[:name]) do |sub|
    sub.description = sub_data[:description]
    sub.features = sub_data[:features]
  end
end

Rails.logger.info '✅ Subscription plans seeded.'
