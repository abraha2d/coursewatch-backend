define({
  api: [
    {
      type: "post",
      url: "/auth",
      title: "Authenticate",
      name: "Authenticate",
      group: "Auth",
      permission: [
        {
          name: "master",
          title: "Master access only",
          description:
            "<p>You must pass <code>access_token</code> parameter or a Bearer Token authorization header to access this endpoint.</p>"
        }
      ],
      header: {
        fields: {
          Header: [
            {
              group: "Header",
              type: "String",
              optional: false,
              field: "Authorization",
              description: "<p>Basic authorization with email and password.</p>"
            }
          ]
        }
      },
      parameter: {
        fields: {
          Parameter: [
            {
              group: "Parameter",
              type: "String",
              optional: false,
              field: "access_token",
              description: "<p>Master access_token.</p>"
            }
          ]
        }
      },
      success: {
        fields: {
          "Success 201": [
            {
              group: "Success 201",
              type: "String",
              optional: false,
              field: "token",
              description:
                "<p>User <code>access_token</code> to be passed to other requests.</p>"
            },
            {
              group: "Success 201",
              type: "Object",
              optional: false,
              field: "user",
              description: "<p>Current user's data.</p>"
            }
          ]
        }
      },
      error: {
        fields: {
          "Error 4xx": [
            {
              group: "Error 4xx",
              optional: false,
              field: "401",
              description: "<p>Master access only or invalid credentials.</p>"
            }
          ]
        }
      },
      version: "0.0.0",
      filename: "src/api/auth/index.js",
      groupTitle: "Auth"
    },
    {
      type: "post",
      url: "/auth/github",
      title: "Authenticate with Github",
      name: "AuthenticateGithub",
      group: "Auth",
      parameter: {
        fields: {
          Parameter: [
            {
              group: "Parameter",
              type: "String",
              optional: false,
              field: "access_token",
              description: "<p>Github user accessToken.</p>"
            }
          ]
        }
      },
      success: {
        fields: {
          "Success 201": [
            {
              group: "Success 201",
              type: "String",
              optional: false,
              field: "token",
              description:
                "<p>User <code>access_token</code> to be passed to other requests.</p>"
            },
            {
              group: "Success 201",
              type: "Object",
              optional: false,
              field: "user",
              description: "<p>Current user's data.</p>"
            }
          ]
        }
      },
      error: {
        fields: {
          "Error 4xx": [
            {
              group: "Error 4xx",
              optional: false,
              field: "401",
              description: "<p>Invalid credentials.</p>"
            }
          ]
        }
      },
      version: "0.0.0",
      filename: "src/api/auth/index.js",
      groupTitle: "Auth"
    },
    {
      type: "post",
      url: "/auth/google",
      title: "Authenticate with Google",
      name: "AuthenticateGoogle",
      group: "Auth",
      parameter: {
        fields: {
          Parameter: [
            {
              group: "Parameter",
              type: "String",
              optional: false,
              field: "access_token",
              description: "<p>Google user accessToken.</p>"
            }
          ]
        }
      },
      success: {
        fields: {
          "Success 201": [
            {
              group: "Success 201",
              type: "String",
              optional: false,
              field: "token",
              description:
                "<p>User <code>access_token</code> to be passed to other requests.</p>"
            },
            {
              group: "Success 201",
              type: "Object",
              optional: false,
              field: "user",
              description: "<p>Current user's data.</p>"
            }
          ]
        }
      },
      error: {
        fields: {
          "Error 4xx": [
            {
              group: "Error 4xx",
              optional: false,
              field: "401",
              description: "<p>Invalid credentials.</p>"
            }
          ]
        }
      },
      version: "0.0.0",
      filename: "src/api/auth/index.js",
      groupTitle: "Auth"
    },
    {
      type: "post",
      url: "/colleges",
      title: "Create college",
      name: "CreateCollege",
      group: "College",
      permission: [
        {
          name: "master",
          title: "Master access only",
          description:
            "<p>You must pass <code>access_token</code> parameter or a Bearer Token authorization header to access this endpoint.</p>"
        }
      ],
      parameter: {
        fields: {
          Parameter: [
            {
              group: "Parameter",
              type: "String",
              optional: false,
              field: "access_token",
              description: "<p>master access token.</p>"
            },
            {
              group: "Parameter",
              optional: false,
              field: "code",
              description: "<p>College's code.</p>"
            },
            {
              group: "Parameter",
              optional: false,
              field: "name",
              description: "<p>College's name.</p>"
            },
            {
              group: "Parameter",
              optional: false,
              field: "url",
              description: "<p>College's url.</p>"
            }
          ]
        }
      },
      success: {
        fields: {
          "Success 200": [
            {
              group: "Success 200",
              type: "Object",
              optional: false,
              field: "college",
              description: "<p>College's data.</p>"
            }
          ]
        }
      },
      error: {
        fields: {
          "Error 4xx": [
            {
              group: "Error 4xx",
              type: "Object",
              optional: false,
              field: "400",
              description: "<p>Some parameters may contain invalid values.</p>"
            },
            {
              group: "Error 4xx",
              optional: false,
              field: "404",
              description: "<p>College not found.</p>"
            },
            {
              group: "Error 4xx",
              optional: false,
              field: "401",
              description: "<p>master access only.</p>"
            }
          ]
        }
      },
      version: "0.0.0",
      filename: "src/api/college/index.js",
      groupTitle: "College"
    },
    {
      type: "delete",
      url: "/colleges/:id",
      title: "Delete college",
      name: "DeleteCollege",
      group: "College",
      permission: [
        {
          name: "master",
          title: "Master access only",
          description:
            "<p>You must pass <code>access_token</code> parameter or a Bearer Token authorization header to access this endpoint.</p>"
        }
      ],
      parameter: {
        fields: {
          Parameter: [
            {
              group: "Parameter",
              type: "String",
              optional: false,
              field: "access_token",
              description: "<p>master access token.</p>"
            }
          ]
        }
      },
      success: {
        fields: {
          "Success 204": [
            {
              group: "Success 204",
              optional: false,
              field: "204",
              description: "<p>No Content.</p>"
            }
          ]
        }
      },
      error: {
        fields: {
          "Error 4xx": [
            {
              group: "Error 4xx",
              optional: false,
              field: "404",
              description: "<p>College not found.</p>"
            },
            {
              group: "Error 4xx",
              optional: false,
              field: "401",
              description: "<p>master access only.</p>"
            }
          ]
        }
      },
      version: "0.0.0",
      filename: "src/api/college/index.js",
      groupTitle: "College"
    },
    {
      type: "get",
      url: "/colleges/:id",
      title: "Retrieve college",
      name: "RetrieveCollege",
      group: "College",
      permission: [
        {
          name: "user",
          title: "User access only",
          description:
            "<p>You must pass <code>access_token</code> parameter or a Bearer Token authorization header to access this endpoint.</p>"
        }
      ],
      parameter: {
        fields: {
          Parameter: [
            {
              group: "Parameter",
              type: "String",
              optional: false,
              field: "access_token",
              description: "<p>user access token.</p>"
            }
          ]
        }
      },
      success: {
        fields: {
          "Success 200": [
            {
              group: "Success 200",
              type: "Object",
              optional: false,
              field: "college",
              description: "<p>College's data.</p>"
            }
          ]
        }
      },
      error: {
        fields: {
          "Error 4xx": [
            {
              group: "Error 4xx",
              type: "Object",
              optional: false,
              field: "400",
              description: "<p>Some parameters may contain invalid values.</p>"
            },
            {
              group: "Error 4xx",
              optional: false,
              field: "404",
              description: "<p>College not found.</p>"
            },
            {
              group: "Error 4xx",
              optional: false,
              field: "401",
              description: "<p>user access only.</p>"
            }
          ]
        }
      },
      version: "0.0.0",
      filename: "src/api/college/index.js",
      groupTitle: "College"
    },
    {
      type: "get",
      url: "/colleges",
      title: "Retrieve colleges",
      name: "RetrieveColleges",
      group: "College",
      permission: [
        {
          name: "user",
          title: "User access only",
          description:
            "<p>You must pass <code>access_token</code> parameter or a Bearer Token authorization header to access this endpoint.</p>"
        }
      ],
      parameter: {
        fields: {
          Parameter: [
            {
              group: "Parameter",
              type: "String",
              optional: false,
              field: "access_token",
              description: "<p>user access token.</p>"
            },
            {
              group: "Parameter",
              type: "String",
              optional: true,
              field: "q",
              description: "<p>Query to search.</p>"
            },
            {
              group: "Parameter",
              type: "Number",
              size: "1..30",
              optional: true,
              field: "page",
              defaultValue: "1",
              description: "<p>Page number.</p>"
            },
            {
              group: "Parameter",
              type: "Number",
              size: "1..100",
              optional: true,
              field: "limit",
              defaultValue: "30",
              description: "<p>Amount of returned items.</p>"
            },
            {
              group: "Parameter",
              type: "String[]",
              optional: true,
              field: "sort",
              defaultValue: "-createdAt",
              description: "<p>Order of returned items.</p>"
            },
            {
              group: "Parameter",
              type: "String[]",
              optional: true,
              field: "fields",
              description: "<p>Fields to be returned.</p>"
            }
          ]
        }
      },
      success: {
        fields: {
          "Success 200": [
            {
              group: "Success 200",
              type: "Object[]",
              optional: false,
              field: "colleges",
              description: "<p>List of colleges.</p>"
            }
          ]
        }
      },
      error: {
        fields: {
          "Error 4xx": [
            {
              group: "Error 4xx",
              type: "Object",
              optional: false,
              field: "400",
              description: "<p>Some parameters may contain invalid values.</p>"
            },
            {
              group: "Error 4xx",
              optional: false,
              field: "401",
              description: "<p>user access only.</p>"
            }
          ]
        }
      },
      version: "0.0.0",
      filename: "src/api/college/index.js",
      groupTitle: "College"
    },
    {
      type: "put",
      url: "/colleges/:id",
      title: "Update college",
      name: "UpdateCollege",
      group: "College",
      permission: [
        {
          name: "master",
          title: "Master access only",
          description:
            "<p>You must pass <code>access_token</code> parameter or a Bearer Token authorization header to access this endpoint.</p>"
        }
      ],
      parameter: {
        fields: {
          Parameter: [
            {
              group: "Parameter",
              type: "String",
              optional: false,
              field: "access_token",
              description: "<p>master access token.</p>"
            },
            {
              group: "Parameter",
              optional: false,
              field: "code",
              description: "<p>College's code.</p>"
            },
            {
              group: "Parameter",
              optional: false,
              field: "name",
              description: "<p>College's name.</p>"
            },
            {
              group: "Parameter",
              optional: false,
              field: "url",
              description: "<p>College's url.</p>"
            }
          ]
        }
      },
      success: {
        fields: {
          "Success 200": [
            {
              group: "Success 200",
              type: "Object",
              optional: false,
              field: "college",
              description: "<p>College's data.</p>"
            }
          ]
        }
      },
      error: {
        fields: {
          "Error 4xx": [
            {
              group: "Error 4xx",
              type: "Object",
              optional: false,
              field: "400",
              description: "<p>Some parameters may contain invalid values.</p>"
            },
            {
              group: "Error 4xx",
              optional: false,
              field: "404",
              description: "<p>College not found.</p>"
            },
            {
              group: "Error 4xx",
              optional: false,
              field: "401",
              description: "<p>master access only.</p>"
            }
          ]
        }
      },
      version: "0.0.0",
      filename: "src/api/college/index.js",
      groupTitle: "College"
    },
    {
      type: "post",
      url: "/courses",
      title: "Create course",
      name: "CreateCourse",
      group: "Course",
      permission: [
        {
          name: "user",
          title: "User access only",
          description:
            "<p>You must pass <code>access_token</code> parameter or a Bearer Token authorization header to access this endpoint.</p>"
        }
      ],
      parameter: {
        fields: {
          Parameter: [
            {
              group: "Parameter",
              type: "String",
              optional: false,
              field: "access_token",
              description: "<p>user access token.</p>"
            },
            {
              group: "Parameter",
              optional: false,
              field: "term",
              description: "<p>Course's term.</p>"
            },
            {
              group: "Parameter",
              optional: false,
              field: "crn",
              description: "<p>Course's crn.</p>"
            },
            {
              group: "Parameter",
              optional: false,
              field: "subject",
              description: "<p>Course's subject.</p>"
            },
            {
              group: "Parameter",
              optional: false,
              field: "number",
              description: "<p>Course's number.</p>"
            },
            {
              group: "Parameter",
              optional: false,
              field: "section",
              description: "<p>Course's section.</p>"
            },
            {
              group: "Parameter",
              optional: false,
              field: "title",
              description: "<p>Course's title.</p>"
            }
          ]
        }
      },
      success: {
        fields: {
          "Success 200": [
            {
              group: "Success 200",
              type: "Object",
              optional: false,
              field: "course",
              description: "<p>Course's data.</p>"
            }
          ]
        }
      },
      error: {
        fields: {
          "Error 4xx": [
            {
              group: "Error 4xx",
              type: "Object",
              optional: false,
              field: "400",
              description: "<p>Some parameters may contain invalid values.</p>"
            },
            {
              group: "Error 4xx",
              optional: false,
              field: "404",
              description: "<p>Course not found.</p>"
            },
            {
              group: "Error 4xx",
              optional: false,
              field: "401",
              description: "<p>user access only.</p>"
            }
          ]
        }
      },
      version: "0.0.0",
      filename: "src/api/course/index.js",
      groupTitle: "Course"
    },
    {
      type: "delete",
      url: "/courses/:id",
      title: "Delete course",
      name: "DeleteCourse",
      group: "Course",
      permission: [
        {
          name: "master",
          title: "Master access only",
          description:
            "<p>You must pass <code>access_token</code> parameter or a Bearer Token authorization header to access this endpoint.</p>"
        }
      ],
      parameter: {
        fields: {
          Parameter: [
            {
              group: "Parameter",
              type: "String",
              optional: false,
              field: "access_token",
              description: "<p>master access token.</p>"
            }
          ]
        }
      },
      success: {
        fields: {
          "Success 204": [
            {
              group: "Success 204",
              optional: false,
              field: "204",
              description: "<p>No Content.</p>"
            }
          ]
        }
      },
      error: {
        fields: {
          "Error 4xx": [
            {
              group: "Error 4xx",
              optional: false,
              field: "404",
              description: "<p>Course not found.</p>"
            },
            {
              group: "Error 4xx",
              optional: false,
              field: "401",
              description: "<p>master access only.</p>"
            }
          ]
        }
      },
      version: "0.0.0",
      filename: "src/api/course/index.js",
      groupTitle: "Course"
    },
    {
      type: "get",
      url: "/coursese/process",
      title: "Process courses",
      name: "ProcessCourses",
      group: "Course",
      permission: [{ name: "public" }],
      success: {
        fields: {
          "Success 204": [
            {
              group: "Success 204",
              optional: false,
              field: "204",
              description: "<p>No Content.</p>"
            }
          ]
        }
      },
      version: "0.0.0",
      filename: "src/api/course/index.js",
      groupTitle: "Course",
      parameter: {
        fields: {
          Parameter: [
            {
              group: "Parameter",
              type: "String",
              optional: true,
              field: "q",
              description: "<p>Query to search.</p>"
            },
            {
              group: "Parameter",
              type: "Number",
              size: "1..30",
              optional: true,
              field: "page",
              defaultValue: "1",
              description: "<p>Page number.</p>"
            },
            {
              group: "Parameter",
              type: "Number",
              size: "1..100",
              optional: true,
              field: "limit",
              defaultValue: "30",
              description: "<p>Amount of returned items.</p>"
            },
            {
              group: "Parameter",
              type: "String[]",
              optional: true,
              field: "sort",
              defaultValue: "-createdAt",
              description: "<p>Order of returned items.</p>"
            },
            {
              group: "Parameter",
              type: "String[]",
              optional: true,
              field: "fields",
              description: "<p>Fields to be returned.</p>"
            }
          ]
        }
      }
    },
    {
      type: "get",
      url: "/courses/:id",
      title: "Retrieve course",
      name: "RetrieveCourse",
      group: "Course",
      permission: [
        {
          name: "user",
          title: "User access only",
          description:
            "<p>You must pass <code>access_token</code> parameter or a Bearer Token authorization header to access this endpoint.</p>"
        }
      ],
      parameter: {
        fields: {
          Parameter: [
            {
              group: "Parameter",
              type: "String",
              optional: false,
              field: "access_token",
              description: "<p>user access token.</p>"
            }
          ]
        }
      },
      success: {
        fields: {
          "Success 200": [
            {
              group: "Success 200",
              type: "Object",
              optional: false,
              field: "course",
              description: "<p>Course's data.</p>"
            }
          ]
        }
      },
      error: {
        fields: {
          "Error 4xx": [
            {
              group: "Error 4xx",
              type: "Object",
              optional: false,
              field: "400",
              description: "<p>Some parameters may contain invalid values.</p>"
            },
            {
              group: "Error 4xx",
              optional: false,
              field: "404",
              description: "<p>Course not found.</p>"
            },
            {
              group: "Error 4xx",
              optional: false,
              field: "401",
              description: "<p>user access only.</p>"
            }
          ]
        }
      },
      version: "0.0.0",
      filename: "src/api/course/index.js",
      groupTitle: "Course"
    },
    {
      type: "get",
      url: "/courses",
      title: "Retrieve courses",
      name: "RetrieveCourses",
      group: "Course",
      permission: [
        {
          name: "user",
          title: "User access only",
          description:
            "<p>You must pass <code>access_token</code> parameter or a Bearer Token authorization header to access this endpoint.</p>"
        }
      ],
      parameter: {
        fields: {
          Parameter: [
            {
              group: "Parameter",
              type: "String",
              optional: false,
              field: "access_token",
              description: "<p>user access token.</p>"
            },
            {
              group: "Parameter",
              type: "String",
              optional: true,
              field: "q",
              description: "<p>Query to search.</p>"
            },
            {
              group: "Parameter",
              type: "Number",
              size: "1..30",
              optional: true,
              field: "page",
              defaultValue: "1",
              description: "<p>Page number.</p>"
            },
            {
              group: "Parameter",
              type: "Number",
              size: "1..100",
              optional: true,
              field: "limit",
              defaultValue: "30",
              description: "<p>Amount of returned items.</p>"
            },
            {
              group: "Parameter",
              type: "String[]",
              optional: true,
              field: "sort",
              defaultValue: "-createdAt",
              description: "<p>Order of returned items.</p>"
            },
            {
              group: "Parameter",
              type: "String[]",
              optional: true,
              field: "fields",
              description: "<p>Fields to be returned.</p>"
            }
          ]
        }
      },
      success: {
        fields: {
          "Success 200": [
            {
              group: "Success 200",
              type: "Object[]",
              optional: false,
              field: "courses",
              description: "<p>List of courses.</p>"
            }
          ]
        }
      },
      error: {
        fields: {
          "Error 4xx": [
            {
              group: "Error 4xx",
              type: "Object",
              optional: false,
              field: "400",
              description: "<p>Some parameters may contain invalid values.</p>"
            },
            {
              group: "Error 4xx",
              optional: false,
              field: "401",
              description: "<p>user access only.</p>"
            }
          ]
        }
      },
      version: "0.0.0",
      filename: "src/api/course/index.js",
      groupTitle: "Course"
    },
    {
      type: "put",
      url: "/courses/:id",
      title: "Update course",
      name: "UpdateCourse",
      group: "Course",
      permission: [
        {
          name: "master",
          title: "Master access only",
          description:
            "<p>You must pass <code>access_token</code> parameter or a Bearer Token authorization header to access this endpoint.</p>"
        }
      ],
      parameter: {
        fields: {
          Parameter: [
            {
              group: "Parameter",
              type: "String",
              optional: false,
              field: "access_token",
              description: "<p>master access token.</p>"
            },
            {
              group: "Parameter",
              optional: false,
              field: "term",
              description: "<p>Course's term.</p>"
            },
            {
              group: "Parameter",
              optional: false,
              field: "crn",
              description: "<p>Course's crn.</p>"
            },
            {
              group: "Parameter",
              optional: false,
              field: "subject",
              description: "<p>Course's subject.</p>"
            },
            {
              group: "Parameter",
              optional: false,
              field: "number",
              description: "<p>Course's number.</p>"
            },
            {
              group: "Parameter",
              optional: false,
              field: "section",
              description: "<p>Course's section.</p>"
            },
            {
              group: "Parameter",
              optional: false,
              field: "title",
              description: "<p>Course's title.</p>"
            }
          ]
        }
      },
      success: {
        fields: {
          "Success 200": [
            {
              group: "Success 200",
              type: "Object",
              optional: false,
              field: "course",
              description: "<p>Course's data.</p>"
            }
          ]
        }
      },
      error: {
        fields: {
          "Error 4xx": [
            {
              group: "Error 4xx",
              type: "Object",
              optional: false,
              field: "400",
              description: "<p>Some parameters may contain invalid values.</p>"
            },
            {
              group: "Error 4xx",
              optional: false,
              field: "404",
              description: "<p>Course not found.</p>"
            },
            {
              group: "Error 4xx",
              optional: false,
              field: "401",
              description: "<p>master access only.</p>"
            }
          ]
        }
      },
      version: "0.0.0",
      filename: "src/api/course/index.js",
      groupTitle: "Course"
    },
    {
      type: "post",
      url: "/password-resets",
      title: "Send email",
      name: "SendPasswordReset",
      group: "PasswordReset",
      permission: [
        {
          name: "master",
          title: "Master access only",
          description:
            "<p>You must pass <code>access_token</code> parameter or a Bearer Token authorization header to access this endpoint.</p>"
        }
      ],
      parameter: {
        fields: {
          Parameter: [
            {
              group: "Parameter",
              type: "String",
              optional: false,
              field: "email",
              description:
                "<p>Email address to receive the password reset token.</p>"
            },
            {
              group: "Parameter",
              type: "String",
              optional: false,
              field: "link",
              description: "<p>Link to redirect user.</p>"
            }
          ]
        }
      },
      success: {
        fields: {
          "Success 202": [
            {
              group: "Success 202",
              optional: false,
              field: "202",
              description: "<p>Accepted.</p>"
            }
          ]
        }
      },
      error: {
        fields: {
          "Error 4xx": [
            {
              group: "Error 4xx",
              type: "Object",
              optional: false,
              field: "400",
              description: "<p>Some parameters may contain invalid values.</p>"
            }
          ]
        }
      },
      version: "0.0.0",
      filename: "src/api/password-reset/index.js",
      groupTitle: "PasswordReset"
    },
    {
      type: "put",
      url: "/password-resets/:token",
      title: "Submit password",
      name: "SubmitPasswordReset",
      group: "PasswordReset",
      parameter: {
        fields: {
          Parameter: [
            {
              group: "Parameter",
              type: "String",
              size: "6..",
              optional: false,
              field: "password",
              description: "<p>User's new password.</p>"
            }
          ]
        }
      },
      success: {
        fields: {
          "Success 200": [
            {
              group: "Success 200",
              type: "Object",
              optional: false,
              field: "user",
              description: "<p>User's data.</p>"
            }
          ]
        }
      },
      error: {
        fields: {
          "Error 4xx": [
            {
              group: "Error 4xx",
              type: "Object",
              optional: false,
              field: "400",
              description: "<p>Some parameters may contain invalid values.</p>"
            },
            {
              group: "Error 4xx",
              optional: false,
              field: "404",
              description: "<p>Token has expired or doesn't exist.</p>"
            }
          ]
        }
      },
      version: "0.0.0",
      filename: "src/api/password-reset/index.js",
      groupTitle: "PasswordReset"
    },
    {
      type: "get",
      url: "/password-resets/:token",
      title: "Verify token",
      name: "VerifyPasswordReset",
      group: "PasswordReset",
      success: {
        fields: {
          "Success 200": [
            {
              group: "Success 200",
              type: "String",
              optional: false,
              field: "token",
              description: "<p>Password reset token.</p>"
            },
            {
              group: "Success 200",
              type: "Object",
              optional: false,
              field: "user",
              description: "<p>User's data.</p>"
            }
          ]
        }
      },
      error: {
        fields: {
          "Error 4xx": [
            {
              group: "Error 4xx",
              optional: false,
              field: "404",
              description: "<p>Token has expired or doesn't exist.</p>"
            }
          ]
        }
      },
      version: "0.0.0",
      filename: "src/api/password-reset/index.js",
      groupTitle: "PasswordReset"
    },
    {
      type: "post",
      url: "/subscriptions",
      title: "Create subscription",
      name: "CreateSubscription",
      group: "Subscription",
      permission: [
        {
          name: "user",
          title: "User access only",
          description:
            "<p>You must pass <code>access_token</code> parameter or a Bearer Token authorization header to access this endpoint.</p>"
        }
      ],
      parameter: {
        fields: {
          Parameter: [
            {
              group: "Parameter",
              type: "String",
              optional: false,
              field: "access_token",
              description: "<p>user access token.</p>"
            },
            {
              group: "Parameter",
              optional: false,
              field: "course",
              description: "<p>Subscription's course.</p>"
            }
          ]
        }
      },
      success: {
        fields: {
          "Success 200": [
            {
              group: "Success 200",
              type: "Object",
              optional: false,
              field: "subscription",
              description: "<p>Subscription's data.</p>"
            }
          ]
        }
      },
      error: {
        fields: {
          "Error 4xx": [
            {
              group: "Error 4xx",
              type: "Object",
              optional: false,
              field: "400",
              description: "<p>Some parameters may contain invalid values.</p>"
            },
            {
              group: "Error 4xx",
              optional: false,
              field: "404",
              description: "<p>Subscription not found.</p>"
            },
            {
              group: "Error 4xx",
              optional: false,
              field: "401",
              description: "<p>user access only.</p>"
            }
          ]
        }
      },
      version: "0.0.0",
      filename: "src/api/subscription/index.js",
      groupTitle: "Subscription"
    },
    {
      type: "delete",
      url: "/subscriptions/:id",
      title: "Delete subscription",
      name: "DeleteSubscription",
      group: "Subscription",
      permission: [
        {
          name: "user",
          title: "User access only",
          description:
            "<p>You must pass <code>access_token</code> parameter or a Bearer Token authorization header to access this endpoint.</p>"
        }
      ],
      parameter: {
        fields: {
          Parameter: [
            {
              group: "Parameter",
              type: "String",
              optional: false,
              field: "access_token",
              description: "<p>user access token.</p>"
            }
          ]
        }
      },
      success: {
        fields: {
          "Success 204": [
            {
              group: "Success 204",
              optional: false,
              field: "204",
              description: "<p>No Content.</p>"
            }
          ]
        }
      },
      error: {
        fields: {
          "Error 4xx": [
            {
              group: "Error 4xx",
              optional: false,
              field: "404",
              description: "<p>Subscription not found.</p>"
            },
            {
              group: "Error 4xx",
              optional: false,
              field: "401",
              description: "<p>user access only.</p>"
            }
          ]
        }
      },
      version: "0.0.0",
      filename: "src/api/subscription/index.js",
      groupTitle: "Subscription"
    },
    {
      type: "get",
      url: "/subscriptions/process",
      title: "Process subscriptions",
      name: "ProcessSubscriptions",
      group: "Subscription",
      permission: [{ name: "public" }],
      success: {
        fields: {
          "Success 204": [
            {
              group: "Success 204",
              optional: false,
              field: "204",
              description: "<p>No Content.</p>"
            }
          ]
        }
      },
      version: "0.0.0",
      filename: "src/api/subscription/index.js",
      groupTitle: "Subscription",
      parameter: {
        fields: {
          Parameter: [
            {
              group: "Parameter",
              type: "String",
              optional: true,
              field: "q",
              description: "<p>Query to search.</p>"
            },
            {
              group: "Parameter",
              type: "Number",
              size: "1..30",
              optional: true,
              field: "page",
              defaultValue: "1",
              description: "<p>Page number.</p>"
            },
            {
              group: "Parameter",
              type: "Number",
              size: "1..100",
              optional: true,
              field: "limit",
              defaultValue: "30",
              description: "<p>Amount of returned items.</p>"
            },
            {
              group: "Parameter",
              type: "String[]",
              optional: true,
              field: "sort",
              defaultValue: "-createdAt",
              description: "<p>Order of returned items.</p>"
            },
            {
              group: "Parameter",
              type: "String[]",
              optional: true,
              field: "fields",
              description: "<p>Fields to be returned.</p>"
            }
          ]
        }
      }
    },
    {
      type: "get",
      url: "/subscriptions/:id",
      title: "Retrieve subscription",
      name: "RetrieveSubscription",
      group: "Subscription",
      permission: [
        {
          name: "user",
          title: "User access only",
          description:
            "<p>You must pass <code>access_token</code> parameter or a Bearer Token authorization header to access this endpoint.</p>"
        }
      ],
      parameter: {
        fields: {
          Parameter: [
            {
              group: "Parameter",
              type: "String",
              optional: false,
              field: "access_token",
              description: "<p>user access token.</p>"
            }
          ]
        }
      },
      success: {
        fields: {
          "Success 200": [
            {
              group: "Success 200",
              type: "Object",
              optional: false,
              field: "subscription",
              description: "<p>Subscription's data.</p>"
            }
          ]
        }
      },
      error: {
        fields: {
          "Error 4xx": [
            {
              group: "Error 4xx",
              type: "Object",
              optional: false,
              field: "400",
              description: "<p>Some parameters may contain invalid values.</p>"
            },
            {
              group: "Error 4xx",
              optional: false,
              field: "404",
              description: "<p>Subscription not found.</p>"
            },
            {
              group: "Error 4xx",
              optional: false,
              field: "401",
              description: "<p>user access only.</p>"
            }
          ]
        }
      },
      version: "0.0.0",
      filename: "src/api/subscription/index.js",
      groupTitle: "Subscription"
    },
    {
      type: "get",
      url: "/subscriptions",
      title: "Retrieve subscriptions",
      name: "RetrieveSubscriptions",
      group: "Subscription",
      permission: [
        {
          name: "user",
          title: "User access only",
          description:
            "<p>You must pass <code>access_token</code> parameter or a Bearer Token authorization header to access this endpoint.</p>"
        }
      ],
      parameter: {
        fields: {
          Parameter: [
            {
              group: "Parameter",
              type: "String",
              optional: false,
              field: "access_token",
              description: "<p>user access token.</p>"
            },
            {
              group: "Parameter",
              type: "String",
              optional: true,
              field: "q",
              description: "<p>Query to search.</p>"
            },
            {
              group: "Parameter",
              type: "Number",
              size: "1..30",
              optional: true,
              field: "page",
              defaultValue: "1",
              description: "<p>Page number.</p>"
            },
            {
              group: "Parameter",
              type: "Number",
              size: "1..100",
              optional: true,
              field: "limit",
              defaultValue: "30",
              description: "<p>Amount of returned items.</p>"
            },
            {
              group: "Parameter",
              type: "String[]",
              optional: true,
              field: "sort",
              defaultValue: "-createdAt",
              description: "<p>Order of returned items.</p>"
            },
            {
              group: "Parameter",
              type: "String[]",
              optional: true,
              field: "fields",
              description: "<p>Fields to be returned.</p>"
            }
          ]
        }
      },
      success: {
        fields: {
          "Success 200": [
            {
              group: "Success 200",
              type: "Object[]",
              optional: false,
              field: "subscriptions",
              description: "<p>List of subscriptions.</p>"
            }
          ]
        }
      },
      error: {
        fields: {
          "Error 4xx": [
            {
              group: "Error 4xx",
              type: "Object",
              optional: false,
              field: "400",
              description: "<p>Some parameters may contain invalid values.</p>"
            },
            {
              group: "Error 4xx",
              optional: false,
              field: "401",
              description: "<p>user access only.</p>"
            }
          ]
        }
      },
      version: "0.0.0",
      filename: "src/api/subscription/index.js",
      groupTitle: "Subscription"
    },
    {
      type: "put",
      url: "/subscriptions/:id",
      title: "Update subscription",
      name: "UpdateSubscription",
      group: "Subscription",
      permission: [
        {
          name: "user",
          title: "User access only",
          description:
            "<p>You must pass <code>access_token</code> parameter or a Bearer Token authorization header to access this endpoint.</p>"
        }
      ],
      parameter: {
        fields: {
          Parameter: [
            {
              group: "Parameter",
              type: "String",
              optional: false,
              field: "access_token",
              description: "<p>user access token.</p>"
            },
            {
              group: "Parameter",
              optional: false,
              field: "course",
              description: "<p>Subscription's course.</p>"
            }
          ]
        }
      },
      success: {
        fields: {
          "Success 200": [
            {
              group: "Success 200",
              type: "Object",
              optional: false,
              field: "subscription",
              description: "<p>Subscription's data.</p>"
            }
          ]
        }
      },
      error: {
        fields: {
          "Error 4xx": [
            {
              group: "Error 4xx",
              type: "Object",
              optional: false,
              field: "400",
              description: "<p>Some parameters may contain invalid values.</p>"
            },
            {
              group: "Error 4xx",
              optional: false,
              field: "404",
              description: "<p>Subscription not found.</p>"
            },
            {
              group: "Error 4xx",
              optional: false,
              field: "401",
              description: "<p>user access only.</p>"
            }
          ]
        }
      },
      version: "0.0.0",
      filename: "src/api/subscription/index.js",
      groupTitle: "Subscription"
    },
    {
      type: "post",
      url: "/terms",
      title: "Create term",
      name: "CreateTerm",
      group: "Term",
      permission: [
        {
          name: "master",
          title: "Master access only",
          description:
            "<p>You must pass <code>access_token</code> parameter or a Bearer Token authorization header to access this endpoint.</p>"
        }
      ],
      parameter: {
        fields: {
          Parameter: [
            {
              group: "Parameter",
              type: "String",
              optional: false,
              field: "access_token",
              description: "<p>master access token.</p>"
            },
            {
              group: "Parameter",
              optional: false,
              field: "college",
              description: "<p>Term's college.</p>"
            },
            {
              group: "Parameter",
              optional: false,
              field: "yyyymm",
              description: "<p>Term's yyyymm.</p>"
            },
            {
              group: "Parameter",
              optional: false,
              field: "name",
              description: "<p>Term's name.</p>"
            }
          ]
        }
      },
      success: {
        fields: {
          "Success 200": [
            {
              group: "Success 200",
              type: "Object",
              optional: false,
              field: "term",
              description: "<p>Term's data.</p>"
            }
          ]
        }
      },
      error: {
        fields: {
          "Error 4xx": [
            {
              group: "Error 4xx",
              type: "Object",
              optional: false,
              field: "400",
              description: "<p>Some parameters may contain invalid values.</p>"
            },
            {
              group: "Error 4xx",
              optional: false,
              field: "404",
              description: "<p>Term not found.</p>"
            },
            {
              group: "Error 4xx",
              optional: false,
              field: "401",
              description: "<p>master access only.</p>"
            }
          ]
        }
      },
      version: "0.0.0",
      filename: "src/api/term/index.js",
      groupTitle: "Term"
    },
    {
      type: "delete",
      url: "/terms/:id",
      title: "Delete term",
      name: "DeleteTerm",
      group: "Term",
      permission: [
        {
          name: "master",
          title: "Master access only",
          description:
            "<p>You must pass <code>access_token</code> parameter or a Bearer Token authorization header to access this endpoint.</p>"
        }
      ],
      parameter: {
        fields: {
          Parameter: [
            {
              group: "Parameter",
              type: "String",
              optional: false,
              field: "access_token",
              description: "<p>master access token.</p>"
            }
          ]
        }
      },
      success: {
        fields: {
          "Success 204": [
            {
              group: "Success 204",
              optional: false,
              field: "204",
              description: "<p>No Content.</p>"
            }
          ]
        }
      },
      error: {
        fields: {
          "Error 4xx": [
            {
              group: "Error 4xx",
              optional: false,
              field: "404",
              description: "<p>Term not found.</p>"
            },
            {
              group: "Error 4xx",
              optional: false,
              field: "401",
              description: "<p>master access only.</p>"
            }
          ]
        }
      },
      version: "0.0.0",
      filename: "src/api/term/index.js",
      groupTitle: "Term"
    },
    {
      type: "get",
      url: "/terms/:id",
      title: "Retrieve term",
      name: "RetrieveTerm",
      group: "Term",
      permission: [
        {
          name: "user",
          title: "User access only",
          description:
            "<p>You must pass <code>access_token</code> parameter or a Bearer Token authorization header to access this endpoint.</p>"
        }
      ],
      parameter: {
        fields: {
          Parameter: [
            {
              group: "Parameter",
              type: "String",
              optional: false,
              field: "access_token",
              description: "<p>user access token.</p>"
            }
          ]
        }
      },
      success: {
        fields: {
          "Success 200": [
            {
              group: "Success 200",
              type: "Object",
              optional: false,
              field: "term",
              description: "<p>Term's data.</p>"
            }
          ]
        }
      },
      error: {
        fields: {
          "Error 4xx": [
            {
              group: "Error 4xx",
              type: "Object",
              optional: false,
              field: "400",
              description: "<p>Some parameters may contain invalid values.</p>"
            },
            {
              group: "Error 4xx",
              optional: false,
              field: "404",
              description: "<p>Term not found.</p>"
            },
            {
              group: "Error 4xx",
              optional: false,
              field: "401",
              description: "<p>user access only.</p>"
            }
          ]
        }
      },
      version: "0.0.0",
      filename: "src/api/term/index.js",
      groupTitle: "Term"
    },
    {
      type: "get",
      url: "/terms",
      title: "Retrieve terms",
      name: "RetrieveTerms",
      group: "Term",
      permission: [
        {
          name: "user",
          title: "User access only",
          description:
            "<p>You must pass <code>access_token</code> parameter or a Bearer Token authorization header to access this endpoint.</p>"
        }
      ],
      parameter: {
        fields: {
          Parameter: [
            {
              group: "Parameter",
              type: "String",
              optional: false,
              field: "access_token",
              description: "<p>user access token.</p>"
            },
            {
              group: "Parameter",
              type: "String",
              optional: true,
              field: "q",
              description: "<p>Query to search.</p>"
            },
            {
              group: "Parameter",
              type: "Number",
              size: "1..30",
              optional: true,
              field: "page",
              defaultValue: "1",
              description: "<p>Page number.</p>"
            },
            {
              group: "Parameter",
              type: "Number",
              size: "1..100",
              optional: true,
              field: "limit",
              defaultValue: "30",
              description: "<p>Amount of returned items.</p>"
            },
            {
              group: "Parameter",
              type: "String[]",
              optional: true,
              field: "sort",
              defaultValue: "-createdAt",
              description: "<p>Order of returned items.</p>"
            },
            {
              group: "Parameter",
              type: "String[]",
              optional: true,
              field: "fields",
              description: "<p>Fields to be returned.</p>"
            }
          ]
        }
      },
      success: {
        fields: {
          "Success 200": [
            {
              group: "Success 200",
              type: "Object[]",
              optional: false,
              field: "terms",
              description: "<p>List of terms.</p>"
            }
          ]
        }
      },
      error: {
        fields: {
          "Error 4xx": [
            {
              group: "Error 4xx",
              type: "Object",
              optional: false,
              field: "400",
              description: "<p>Some parameters may contain invalid values.</p>"
            },
            {
              group: "Error 4xx",
              optional: false,
              field: "401",
              description: "<p>user access only.</p>"
            }
          ]
        }
      },
      version: "0.0.0",
      filename: "src/api/term/index.js",
      groupTitle: "Term"
    },
    {
      type: "put",
      url: "/terms/:id",
      title: "Update term",
      name: "UpdateTerm",
      group: "Term",
      permission: [
        {
          name: "master",
          title: "Master access only",
          description:
            "<p>You must pass <code>access_token</code> parameter or a Bearer Token authorization header to access this endpoint.</p>"
        }
      ],
      parameter: {
        fields: {
          Parameter: [
            {
              group: "Parameter",
              type: "String",
              optional: false,
              field: "access_token",
              description: "<p>master access token.</p>"
            },
            {
              group: "Parameter",
              optional: false,
              field: "college",
              description: "<p>Term's college.</p>"
            },
            {
              group: "Parameter",
              optional: false,
              field: "yyyymm",
              description: "<p>Term's yyyymm.</p>"
            },
            {
              group: "Parameter",
              optional: false,
              field: "name",
              description: "<p>Term's name.</p>"
            }
          ]
        }
      },
      success: {
        fields: {
          "Success 200": [
            {
              group: "Success 200",
              type: "Object",
              optional: false,
              field: "term",
              description: "<p>Term's data.</p>"
            }
          ]
        }
      },
      error: {
        fields: {
          "Error 4xx": [
            {
              group: "Error 4xx",
              type: "Object",
              optional: false,
              field: "400",
              description: "<p>Some parameters may contain invalid values.</p>"
            },
            {
              group: "Error 4xx",
              optional: false,
              field: "404",
              description: "<p>Term not found.</p>"
            },
            {
              group: "Error 4xx",
              optional: false,
              field: "401",
              description: "<p>master access only.</p>"
            }
          ]
        }
      },
      version: "0.0.0",
      filename: "src/api/term/index.js",
      groupTitle: "Term"
    },
    {
      type: "post",
      url: "/users",
      title: "Create user",
      name: "CreateUser",
      group: "User",
      permission: [
        {
          name: "master",
          title: "Master access only",
          description:
            "<p>You must pass <code>access_token</code> parameter or a Bearer Token authorization header to access this endpoint.</p>"
        }
      ],
      parameter: {
        fields: {
          Parameter: [
            {
              group: "Parameter",
              type: "String",
              optional: false,
              field: "access_token",
              description: "<p>Master access_token.</p>"
            },
            {
              group: "Parameter",
              type: "String",
              optional: false,
              field: "email",
              description: "<p>User's email.</p>"
            },
            {
              group: "Parameter",
              type: "String",
              size: "6..",
              optional: false,
              field: "password",
              description: "<p>User's password.</p>"
            },
            {
              group: "Parameter",
              type: "String",
              optional: true,
              field: "name",
              description: "<p>User's name.</p>"
            },
            {
              group: "Parameter",
              type: "String",
              optional: true,
              field: "picture",
              description: "<p>User's picture.</p>"
            },
            {
              group: "Parameter",
              type: "String",
              optional: true,
              field: "tel",
              description: "<p>User's tel.</p>"
            },
            {
              group: "Parameter",
              type: "String",
              allowedValues: ["user", "admin"],
              optional: true,
              field: "role",
              defaultValue: "user",
              description: "<p>User's role.</p>"
            }
          ]
        }
      },
      success: {
        fields: {
          "Success 201": [
            {
              group: "Success 201",
              type: "Object",
              optional: false,
              field: "user",
              description: "<p>User's data.</p>"
            }
          ]
        }
      },
      error: {
        fields: {
          "Error 4xx": [
            {
              group: "Error 4xx",
              type: "Object",
              optional: false,
              field: "400",
              description: "<p>Some parameters may contain invalid values.</p>"
            },
            {
              group: "Error 4xx",
              optional: false,
              field: "401",
              description: "<p>Master access only.</p>"
            },
            {
              group: "Error 4xx",
              optional: false,
              field: "409",
              description: "<p>Email already registered.</p>"
            }
          ]
        }
      },
      version: "0.0.0",
      filename: "src/api/user/index.js",
      groupTitle: "User"
    },
    {
      type: "delete",
      url: "/users/:id",
      title: "Delete user",
      name: "DeleteUser",
      group: "User",
      permission: [
        {
          name: "admin",
          title: "Admin access only",
          description:
            "<p>You must pass <code>access_token</code> parameter or a Bearer Token authorization header to access this endpoint.</p>"
        }
      ],
      parameter: {
        fields: {
          Parameter: [
            {
              group: "Parameter",
              type: "String",
              optional: false,
              field: "access_token",
              description: "<p>User access_token.</p>"
            }
          ]
        }
      },
      success: {
        fields: {
          "Success 204": [
            {
              group: "Success 204",
              optional: false,
              field: "204",
              description: "<p>No Content.</p>"
            }
          ]
        }
      },
      error: {
        fields: {
          "Error 4xx": [
            {
              group: "Error 4xx",
              optional: false,
              field: "401",
              description: "<p>Admin access only.</p>"
            },
            {
              group: "Error 4xx",
              optional: false,
              field: "404",
              description: "<p>User not found.</p>"
            }
          ]
        }
      },
      version: "0.0.0",
      filename: "src/api/user/index.js",
      groupTitle: "User"
    },
    {
      type: "get",
      url: "/users/me",
      title: "Retrieve current user",
      name: "RetrieveCurrentUser",
      group: "User",
      permission: [
        {
          name: "user",
          title: "User access only",
          description:
            "<p>You must pass <code>access_token</code> parameter or a Bearer Token authorization header to access this endpoint.</p>"
        }
      ],
      parameter: {
        fields: {
          Parameter: [
            {
              group: "Parameter",
              type: "String",
              optional: false,
              field: "access_token",
              description: "<p>User access_token.</p>"
            }
          ]
        }
      },
      success: {
        fields: {
          "Success 200": [
            {
              group: "Success 200",
              type: "Object",
              optional: false,
              field: "user",
              description: "<p>User's data.</p>"
            }
          ]
        }
      },
      version: "0.0.0",
      filename: "src/api/user/index.js",
      groupTitle: "User"
    },
    {
      type: "get",
      url: "/users/:id",
      title: "Retrieve user",
      name: "RetrieveUser",
      group: "User",
      permission: [{ name: "public" }],
      success: {
        fields: {
          "Success 200": [
            {
              group: "Success 200",
              type: "Object",
              optional: false,
              field: "user",
              description: "<p>User's data.</p>"
            }
          ]
        }
      },
      error: {
        fields: {
          "Error 4xx": [
            {
              group: "Error 4xx",
              optional: false,
              field: "404",
              description: "<p>User not found.</p>"
            }
          ]
        }
      },
      version: "0.0.0",
      filename: "src/api/user/index.js",
      groupTitle: "User"
    },
    {
      type: "get",
      url: "/users",
      title: "Retrieve users",
      name: "RetrieveUsers",
      group: "User",
      permission: [
        {
          name: "admin",
          title: "Admin access only",
          description:
            "<p>You must pass <code>access_token</code> parameter or a Bearer Token authorization header to access this endpoint.</p>"
        }
      ],
      parameter: {
        fields: {
          Parameter: [
            {
              group: "Parameter",
              type: "String",
              optional: false,
              field: "access_token",
              description: "<p>User access_token.</p>"
            },
            {
              group: "Parameter",
              type: "String",
              optional: true,
              field: "q",
              description: "<p>Query to search.</p>"
            },
            {
              group: "Parameter",
              type: "Number",
              size: "1..30",
              optional: true,
              field: "page",
              defaultValue: "1",
              description: "<p>Page number.</p>"
            },
            {
              group: "Parameter",
              type: "Number",
              size: "1..100",
              optional: true,
              field: "limit",
              defaultValue: "30",
              description: "<p>Amount of returned items.</p>"
            },
            {
              group: "Parameter",
              type: "String[]",
              optional: true,
              field: "sort",
              defaultValue: "-createdAt",
              description: "<p>Order of returned items.</p>"
            },
            {
              group: "Parameter",
              type: "String[]",
              optional: true,
              field: "fields",
              description: "<p>Fields to be returned.</p>"
            }
          ]
        }
      },
      success: {
        fields: {
          "Success 200": [
            {
              group: "Success 200",
              type: "Object[]",
              optional: false,
              field: "users",
              description: "<p>List of users.</p>"
            }
          ]
        }
      },
      error: {
        fields: {
          "Error 4xx": [
            {
              group: "Error 4xx",
              type: "Object",
              optional: false,
              field: "400",
              description: "<p>Some parameters may contain invalid values.</p>"
            },
            {
              group: "Error 4xx",
              optional: false,
              field: "401",
              description: "<p>Admin access only.</p>"
            }
          ]
        }
      },
      version: "0.0.0",
      filename: "src/api/user/index.js",
      groupTitle: "User"
    },
    {
      type: "put",
      url: "/users/:id/password",
      title: "Update password",
      name: "UpdatePassword",
      group: "User",
      header: {
        fields: {
          Header: [
            {
              group: "Header",
              type: "String",
              optional: false,
              field: "Authorization",
              description: "<p>Basic authorization with email and password.</p>"
            }
          ]
        }
      },
      parameter: {
        fields: {
          Parameter: [
            {
              group: "Parameter",
              type: "String",
              size: "6..",
              optional: false,
              field: "password",
              description: "<p>User's new password.</p>"
            }
          ]
        }
      },
      success: {
        fields: {
          "Success 201": [
            {
              group: "Success 201",
              type: "Object",
              optional: false,
              field: "user",
              description: "<p>User's data.</p>"
            }
          ]
        }
      },
      error: {
        fields: {
          "Error 4xx": [
            {
              group: "Error 4xx",
              type: "Object",
              optional: false,
              field: "400",
              description: "<p>Some parameters may contain invalid values.</p>"
            },
            {
              group: "Error 4xx",
              optional: false,
              field: "401",
              description: "<p>Current user access only.</p>"
            },
            {
              group: "Error 4xx",
              optional: false,
              field: "404",
              description: "<p>User not found.</p>"
            }
          ]
        }
      },
      version: "0.0.0",
      filename: "src/api/user/index.js",
      groupTitle: "User"
    },
    {
      type: "put",
      url: "/users/:id",
      title: "Update user",
      name: "UpdateUser",
      group: "User",
      permission: [
        {
          name: "user",
          title: "User access only",
          description:
            "<p>You must pass <code>access_token</code> parameter or a Bearer Token authorization header to access this endpoint.</p>"
        }
      ],
      parameter: {
        fields: {
          Parameter: [
            {
              group: "Parameter",
              type: "String",
              optional: false,
              field: "access_token",
              description: "<p>User access_token.</p>"
            },
            {
              group: "Parameter",
              type: "String",
              optional: true,
              field: "name",
              description: "<p>User's name.</p>"
            },
            {
              group: "Parameter",
              type: "String",
              optional: true,
              field: "picture",
              description: "<p>User's picture.</p>"
            },
            {
              group: "Parameter",
              type: "String",
              optional: true,
              field: "tel",
              description: "<p>User's tel.</p>"
            }
          ]
        }
      },
      success: {
        fields: {
          "Success 200": [
            {
              group: "Success 200",
              type: "Object",
              optional: false,
              field: "user",
              description: "<p>User's data.</p>"
            }
          ]
        }
      },
      error: {
        fields: {
          "Error 4xx": [
            {
              group: "Error 4xx",
              type: "Object",
              optional: false,
              field: "400",
              description: "<p>Some parameters may contain invalid values.</p>"
            },
            {
              group: "Error 4xx",
              optional: false,
              field: "401",
              description: "<p>Current user or admin access only.</p>"
            },
            {
              group: "Error 4xx",
              optional: false,
              field: "404",
              description: "<p>User not found.</p>"
            }
          ]
        }
      },
      version: "0.0.0",
      filename: "src/api/user/index.js",
      groupTitle: "User"
    }
  ]
});
