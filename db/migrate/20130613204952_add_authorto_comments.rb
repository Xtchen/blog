class AddAuthortoComments < ActiveRecord::Migration
  def up
  	add_column :comments, :author, :string, :default => "anonymous"
  end

  def down
  	remove_column :comments, :author
  end
end
