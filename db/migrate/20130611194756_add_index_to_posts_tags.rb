class AddIndexToPostsTags < ActiveRecord::Migration
  def change
  	add_index :posts_tags, [:post_id, :tag_id], :unique => true 
  end
end
