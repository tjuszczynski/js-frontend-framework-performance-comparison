import './main.css';
import 'bootstrap/dist/js/bootstrap.min';
import {default as angular} from 'angular';

const mainApp = angular.module("mainApp", [])

mainApp.controller("controller", function ($scope, $http) {
    $scope.numberOfItemsToCreate = [{
        value: '1000',
        label: '1000'
    },
        {
            value: '100',
            label: '100'
        },
        {
            value: '10000',
            label: '10000'
        },
        {
            value: '5000',
            label: '5000'
        }, {
            value: '20000',
            label: '20000'
        },
        {
            value: '50000',
            label: '50000'
        }
    ];

    $scope.numberOfItemsToAdd = [
        {
            value: '100',
            label: '100'
        }, {
            value: '1000',
            label: '1000'
        },
        {
            value: '10000',
            label: '10000'
        }
    ];

    $scope.selectedItem = -1;

    $scope.createRows = function () {
        measureTime(performance.now());
        const data = _createTestData($scope.selectedNumberOfItemsToCreate.value);

        $scope.data = data;
    };

    $scope.changeRows = function () {
        measureTime(performance.now());

        for (let i = 0, len = $scope.data.length; i < len; i += 10) {
            $scope.data[i].label = $scope.data[i].label.toUpperCase();
        }
    };

    $scope.addRows = function () {
        measureTime(performance.now());
        const data = _createTestData($scope.selectedNumberOfItemsToAdd.value);

        if ($scope.data != null) {
            $scope.data = $scope.data.concat(data);
        }
        else {
            $scope.data = data;
        }
    };

    $scope.removeListOfItems = function () {
        measureTime(performance.now());
        $scope.data = []
    }

    $scope.getDataHTTP = function () {
        $scope.get(performance.now());
    };

    $scope.get = function (t0) {
        $http({
            method: 'GET',
            url: "data.txt"
        }).then(function (success) {
            document.getElementById("run-angular").innerHTML = (performance.now() - t0).toFixed(2) + " ms";
            $scope.data = success.data;
        }, function (error) {

        });
    }

    $scope.selectItemInList = function (item) {
        measureTime(performance.now());
        $scope.selectedItem = item.id;
    }

    $scope.deleteItem = function (e) {
        measureTime(performance.now());
        angular.element(e.target).parent().parent().remove();
    };

    const measureTime = function (start) {
        $scope.$$postDigest(function () {
            document.getElementById("run-angular").innerHTML = (performance.now() - start).toFixed(2) + " ms";
        });
    }

    const _randomElement = function (arrayLenght) {
        return Math.round(Math.random() * 2222) % arrayLenght;
    }

    const _createTestData = function (count) {
        count = count || 1000;
        const adjectives = ["active", "ambitious", "careful", "decisive", "easy-going", "generous", "polite",
            "responsible", "sensitive", "selfish", "clever", "secretive", "talkative", "honest", "intelligent",
            "faithful", "forgetful"];
        const names = ["Marek", "Tomek", "Emil", "Zuza", "Monika", "Ula", "Ola", "Ala", "Piotr", "Kasia", "Kuba",
            "Anita", "Arek"];

        const testData = [];
        for (let i = 0; i < count; i++)
            testData.push({
                id: i + 1,
                label: `${names[_randomElement(names.length)]} is ${adjectives[_randomElement(adjectives.length)]}.`
            });
        return testData;
    }
});
