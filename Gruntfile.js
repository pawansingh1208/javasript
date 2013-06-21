module.exports = function(grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    db:'manusis',
//coll:'users',
compress: {
  main: {
  options: {
  archive: '<%=db%><%= grunt.template.today("yyyy-mm-dd") %>.zip'
    },
   
 files: [
           {
  // src: ['dump/<%=db%>/*']
src:['Gruntfile.js']
           }
       ]
}
},

 clean: {
  build: {
    src: ["src/manusis/*"]
  }
},

 unzip: {
    	src: '<%=db%><%= grunt.template.today("yyyy-mm-dd") %>.zip'
      	},

gitco: {
branch:'master'
//  repo :'https://github.com/pawansingh1208/javasript.git ',
  },

/*mongodump : {
//manusis:'users'    //databasename:collectionname
},*/

mongorestore : {
  db: 'test',
  directory: '/tmp/test111'
},

    'gh-pages': {
    options: {
     repo: 'git@github.com:pawansingh1208/javasript.git',
     clone: 'git@github.com:pawansingh1208/javasript.git',
message:'Latest commit',
branch:'master'
    },
  // src: [ '<%=db%><%= grunt.template.today("yyyy-mm-dd")%>']
src:['Gruntfile.js']  
}
  });

grunt.registerMultiTask('unzip', 'unzip the file', function() {
var myTerminal = require("child_process").exec,
    	commandToBeExecuted = "unzip "+ this.data +" -d "+ this.target;
	console.log(commandToBeExecuted);
	myTerminal(commandToBeExecuted, function(error, stdout, stderr) {
	});
});

grunt.registerMultiTask('mongorestore', 'Restore the mongodb', function() {
var myTerminal = require("child_process").exec,
commandToBeExecuted = "mongorestore --db manusis --collection coll2 data/manusis/users.bson";
//console.log(commandToBeExecuted);
myTerminal(commandToBeExecuted, function(error, stdout, stderr) {
   });
});

grunt.loadNpmTasks('grunt-contrib-compress');
grunt.loadNpmTasks('grunt-gitco');
grunt.loadNpmTasks('grunt-gh-pages');
grunt.loadNpmTasks('grunt-mongodump');
grunt.loadNpmTasks('grunt-gitlist');
grunt.loadNpmTasks('grunt-contrib-clean');
grunt.registerTask('tasks', ['mongodump','compress','gh-pages','gitlist','unzip']);
};

