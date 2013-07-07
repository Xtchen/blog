class Post < ActiveRecord::Base
	attr_accessible :title, :content
	has_and_belongs_to_many :tags
	has_many :comments, :dependent => :delete_all
	has_many :notices, :through => :comments

	def pre_post
		Post.where("id < ?", self.id).order("id DESC").first
	end

	def next_post
		Post.where("id > ?", self.id).order("id ASC").first
	end
end
