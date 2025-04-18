# frozen_string_literal: true

namespace :db do
  desc 'Drop, create, migrate, and seed the database'
  task reset_with_seeds: :environment do
    puts '🚿 Dropping database...'
    Rake::Task['db:drop'].invoke

    puts '🏗️ Creating database...'
    Rake::Task['db:create'].invoke

    puts '🛠️ Migrating database...'
    Rake::Task['db:migrate'].invoke

    puts '🌱 Seeding database...'
    Rake::Task['db:seed'].invoke

    puts '✅ Done! Fresh RiffTube database ready!'
  end
end
