
Rails.logger.info "👤 Seeding users..."

users = [
  { name: "Joel Robinson", email: "joel@example.com", username: "joel_robinson" },
  { name: "Mike Nelson", email: "mike@example.com", username: "mike_nelson" },
  { name: "Tom Servo", email: "servo@example.com", username: "tom_servo" },
  { name: "Crow T. Robot", email: "crow@example.com", username: "crow_t_robot" },
  { name: "Gypsy", email: "gypsy@example.com", username: "gypsy" },
  { name: "Cambot", email: "cambot@example.com", username: "cambot" },
  { name: "Dr. Clayton Forrester", email: "forrester@example.com", username: "clayton_forrester" },
  { name: "TV's Frank", email: "frank@example.com", username: "tvs_frank" },
  { name: "Magic Voice", email: "magicvoice@example.com", username: "magic_voice" },
  { name: "Pearl Forrester", email: "pearl@example.com", username: "pearl_forrester" },
  { name: "Professor Bobo", email: "bobo@example.com", username: "professor_bobo" },
  { name: "Observer (Brain Guy)", email: "brain_guy@example.com", username: "brain_guy" },
  { name: "TV's Son of TV's Frank", email: "son_of_frank@example.com", username: "son_of_frank" }
]
users.each do |user_data|
  User.find_or_create_by!(email: user_data[:email]) do |user|
    user.name     = user_data[:name]
    user.username = user_data[:username]
    user.password = "password" # bcrypt will hash this
  end
end

Rails.logger.info "✅ Users seeded."
