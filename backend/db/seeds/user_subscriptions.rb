Rails.logger.info '🙋‍♂️ Seeding user subscriptions...'

# Fetch subscriptions
riffer = Subscription.find_by(name: 'Riffer')
super_riffer = Subscription.find_by(name: 'Super Riffer')

# Fetch users
joel = fetch_user!('Joel Robinson')
mike = fetch_user!('Mike Nelson')
crow = fetch_user!('Crow T. Robot')
servo = fetch_user!('Tom Servo')
gypsy = fetch_user!('Gypsy')

# Assign plans
user_subscriptions = [
  { user: joel, plan: riffer },
  { user: mike, plan: riffer },
  { user: crow, plan: super_riffer },
  { user: servo, plan: super_riffer },
  { user: gypsy, plan: riffer }
]

user_subscriptions.each do |sub|
  UserSubscription.find_or_create_by!(
    user_id: sub[:user].id,
    subscription_id: sub[:plan].id,
    started_at: Time.current
  )
end

Rails.logger.info '✅ User subscriptions seeded.'
