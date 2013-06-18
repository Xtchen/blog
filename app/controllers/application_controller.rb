class ApplicationController < ActionController::Base
  protect_from_forgery
  include SessionsHelper
  def admin_validate
  	unless signed_in?
  		flash[:error] = 'Permissin denied!'
  		redirect_to posts_path 	
  	end
  end
end
