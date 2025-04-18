# frozen_string_literal: true

Rails.logger.info '👍👎 Seeding riff reactions...'

servo = fetch_user!('Tom Servo')
crow = fetch_user!('Crow T. Robot')
joel = fetch_user!('Joel Robinson')
mike = fetch_user!('Mike Nelson')
gypsy = fetch_user!('Gypsy')
frank = fetch_user!("TV's Frank")
pearl = fetch_user!('Pearl Forrester')

riffs = Riff.all.to_a

# Ensure there are enough riffs
raise 'Not enough riffs found. Please ensure at least 10 riffs exist in the database.' if riffs.size < 10

# Shuffle the riffs so reactions aren’t always tied to the same ones
riffs.shuffle!

raise 'One or more users could not be found. Please check the database.' if [servo, crow, joel, mike, gypsy, frank,
                                                                             pearl].any?(&:nil?)

reactions_data = [
  { user: crow, riff: riffs[0], type: 'like' },
  { user: servo, riff: riffs[1], type: 'like' },
  { user: mike, riff: riffs[2], type: 'dislike' },
  { user: gypsy, riff: riffs[3], type: 'like' },
  { user: joel, riff: riffs[4], type: 'like' },
  { user: frank, riff: riffs[5], type: 'like' },
  { user: pearl, riff: riffs[6], type: 'dislike' },
  { user: servo, riff: riffs[7], type: 'like' },
  { user: crow, riff: riffs[8], type: 'dislike' },
  { user: mike, riff: riffs[9], type: 'dislike' }
]

reactions_data.each do |reaction|
  next unless reaction[:riff]

  RiffReaction.find_or_create_by!(
    user_id: reaction[:user].id,
    riff_id: reaction[:riff].id,
    reaction_type: reaction[:type]
  )
end

Rails.logger.info '✅ Riff reactions seeded.'
