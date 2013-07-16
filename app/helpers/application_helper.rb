module ApplicationHelper
	def client_ip
  		request.remote_ip
  	end

  	def record_ip(where)
  		if !signed_in?
  			Rails.logger.info "<record> #{client_ip} @#{Time.now} visited #{where} </record>"
  		end
  	end
end
