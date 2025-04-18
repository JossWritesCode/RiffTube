# frozen_string_literal: true

# This migration enables the 'uuid-ossp' extension, which provides support for UUID generation.
class EnableUuidExtension < ActiveRecord::Migration[7.0]
  def change
    enable_extension 'uuid-ossp'
  end
end
