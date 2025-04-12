class CreateRiffReactions < ActiveRecord::Migration[7.0]
  def change
    create_table :riff_reactions, id: :uuid do |t|
      t.uuid :riff_id, null: false
      t.uuid :user_id, null: false
      t.string :reaction_type

      t.timestamps
    end

    add_index :riff_reactions, [:riff_id, :user_id], unique: true
  end
end
