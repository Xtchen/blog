class Admin < ActiveRecord::Base
	attr_accessible :name, :password
	has_secure_password
	before_save :create_remember_token

	private
		def create_remember_token
			self.remember_token = SecureRandom.hex 
		end
end
