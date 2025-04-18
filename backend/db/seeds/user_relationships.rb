# frozen_string_literal: true

Rails.logger.info '👥 Seeding user relationships...'

# Fetch users
servo = fetch_user!('Tom Servo')
crow = fetch_user!('Crow T. Robot')
joel = fetch_user!('Joel Robinson')
mike = fetch_user!('Mike Nelson')
gypsy = fetch_user!('Gypsy')
frank = fetch_user!("TV's Frank")
pearl = fetch_user!('Pearl Forrester')
brain_guy = fetch_user!('Observer (Brain Guy)')
cambot = fetch_user!('Cambot')

# Define relationships
relationships = [
  { from: servo, to: crow, type: 'follow' },
  { from: crow, to: servo, type: 'follow' },
  { from: gypsy, to: joel, type: 'follow' },
  { from: mike, to: cambot, type: 'follow' },
  { from: brain_guy, to: pearl, type: 'follow' },
  { from: frank, to: User.where.not(id: frank.id).pluck(:id), type: 'follow' },

  # Blocking relationships
  { from: pearl, to: crow, type: 'block' },
  { from: pearl, to: servo, type: 'block' },
  { from: pearl, to: mike, type: 'block' },
  { from: crow, to: pearl, type: 'block' }
]

# Seed relationships
relationships.each do |rel|
  if rel[:to].is_a?(Array)
    # Special case: Frank follows everyone
    rel[:to].each do |user_id|
      UserRelationship.find_or_create_by!(
        from_user_id: rel[:from].id,
        to_user_id: user_id,
        relationship_type: rel[:type]
      )
    end
  else
    UserRelationship.find_or_create_by!(
      from_user_id: rel[:from].id,
      to_user_id: rel[:to].id,
      relationship_type: rel[:type]
    )
  end
end

Rails.logger.info '✅ User relationships seeded.'
