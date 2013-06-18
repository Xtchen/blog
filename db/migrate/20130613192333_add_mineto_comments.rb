class AddMinetoComments < ActiveRecord::Migration
  def up
  	add_column :comments, :mine, :boolean, :default => false
  end

  def down
  	remove_column :comments, :mine
  end
end
