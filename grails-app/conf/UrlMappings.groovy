class UrlMappings {

	static mappings = {
        "/$controller/$action?/$id?(.$format)?"{
            constraints {
                // apply constraints here
            }
        }

        "/"(controller:'index', action:'index')
        "500"(view:'/error')
		"404"(view:'/error')
		"405"(view:'/error')
	}
}
