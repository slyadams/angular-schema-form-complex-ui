/**
 * Created by Nicklas B on 2016-01-13.
 */

/*global angular */
"use strict";

/**
 * The main app module
 * @name exampleApp
 * @type {angular.Module}
 */

var exampleApp = angular.module("exampleApp", ["schemaForm"]);

exampleApp.controller("exampleController", ["$scope", function ($scope) {

    // This function returns the schema and form for the field.
    $scope.getDefinitions = function(_ref) {
        return {
            schema: {
                type: "object",
                title: "Complex UI test",
                properties: {
                    test1: {
                        type: "string",
                        description: "So this is inside the nested ASF instance"
                    },
                    test2: {
                        type: "string",
                        description: "...second field"
                    }
                },
                required: ["test1"]
            },
            form : [
                {
                    "key": "test1",
                    "title": "Inside the schema form.",
                    "type": "string"
                },
                {
                    "key": "test2   ",
                    "title": "Inside the schema form.",
                    "type": "select",
                    "titleMap": [
                        {"value": "value1", "name": "text1"},
                        {"value": "value2", "name": "text2"},
                        {"value": "value3", "name": "text3"},
                        {"value": "value4", "name": "text4"}
                    ]
                },
                {
                    type: "button",
                    style: "btn-ok",
                    title: "OK inner",
                    onClick: "controller.innerSubmit(this)"
                }
            ]
            }
    };

    // This is the schema definition for the whole thing.
    $scope.schema = {
        type: "object",
        title: "Complex UI ",
        properties: {
            complexUIField: {
                type: "object",
                format: "",
                description: "So this is a complex UI field."
            },
            anyfield: {
                type: "string",
                format: "",
                description: "This is just a run-of-the-mill string field."
            }
        },
        required: ["complexUIField"]
    };

    // Define all UI aspects of the form
    $scope.form = [

        {
            "key": "complexUIField",
            "title": "Example of complex structure editor",
            "type": "complex-ui",
            "options": {
                "definitionsCallback": $scope.getDefinitions,
                "modal": true,
                "buttonCaption": "..",
                "includeURI": "example_include.html"
            }
        },
        {
            "key": "anyfield",
            "title": "A string",
            "options": {
                "definitionsCallback": $scope.getDefinitions
            }
        },
        {
            type: "submit",
            style: "btn-ok",
            title: "OK outer"
        }
    ];
    // Initiate the model
    $scope.model = {};
    // Initiate one of the inputs
    $scope.model.complexUIField = {"test1": "A value."};

    // This is called by asf on submit, specified in example.html, ng-submit.
    $scope.submitted = function (form) {
        $scope.$broadcast("schemaFormValidate");
        console.log($scope.model);
    };
}]);
