# frozen_string_literal: true

# Migration to create the riff_reactions table with references to riffs and users,
# including a reaction type and timestamps.
class CreateRiffReactions < ActiveRecord::Migration[7.0]
  def change
    create_table :riff_reactions, id: :uuid do |t|
      t.uuid :riff_id, null: false
      t.uuid :user_id, null: false
      t.string :reaction_type

      t.timestamps
    end

    add_index :riff_reactions, %i[riff_id user_id], unique: true
  end
end
