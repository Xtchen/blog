class Comment < ActiveRecord::Base
	attr_accessible :author, :content, :post_id
	belongs_to :post
	has_many :notices, :dependent => :delete_all
	validates :content, :presence => true
	validates :content, :length => { :minimum => 6 }

	def my_to_json(signed)
		Jbuilder.encode do |json|
			json.current self.id
			json.count Post.find(self.post.id).comments.size
			json.valid signed
			json.saved true
			json.comments Post.find(self.post.id).comments do |comment|
				json.id comment.id
				json.author comment.author
				json.content comment.content
				json.created_at comment.created_at.to_formatted_s(:long)
				json.mine comment.mine
				json.post_id comment.post_id
			end
		end
	end
end
