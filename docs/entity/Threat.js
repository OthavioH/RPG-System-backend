"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Threat = void 0;
const typeorm_1 = require("typeorm");
let Threat = class Threat {
    updateData(data) {
        this.vd = data.vd;
        this.name = data.name;
        this.description = data.description;
        this.imageUrl = data.imageUrl;
        this.element = data.element;
        this.secondElements = JSON.stringify(data.secondElements);
        this.skills = JSON.stringify(data.skills);
        this.size = data.size;
        this.type = data.type;
        this.disturbingPresence = JSON.stringify(data.disturbingPresence);
        this.senses = JSON.stringify(data.senses);
        this.defenses = JSON.stringify(data.defenses);
        this.healthPoints = JSON.stringify(data.healthPoints);
        this.vulnerabilities = JSON.stringify(data.vulnerabilities);
        this.attributes = JSON.stringify(data.attributes);
        this.displacements = JSON.stringify(data.displacements);
        this.actions = JSON.stringify(data.actions);
        this.enigma = JSON.stringify(data.enigma);
    }
    parseArrays() {
        this.skills = JSON.parse(this.skills);
        this.attributes = JSON.parse(this.attributes);
        this.secondElements = JSON.parse(this.secondElements);
        this.disturbingPresence = JSON.parse(this.disturbingPresence);
        this.senses = JSON.parse(this.senses);
        this.defenses = JSON.parse(this.defenses);
        this.healthPoints = JSON.parse(this.healthPoints);
        this.vulnerabilities = JSON.parse(this.vulnerabilities);
        this.displacements = JSON.parse(this.displacements);
        this.actions = JSON.parse(this.actions);
        this.enigma = JSON.parse(this.enigma);
    }
};
__decorate([
    (0, typeorm_1.Column)({ primary: true, type: "varchar", length: 255 }),
    __metadata("design:type", String)
], Threat.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: 0 }),
    __metadata("design:type", Number)
], Threat.prototype, "vd", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: "" }),
    __metadata("design:type", String)
], Threat.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: null, type: "longtext" }),
    __metadata("design:type", String)
], Threat.prototype, "description", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: "" }),
    __metadata("design:type", String)
], Threat.prototype, "imageUrl", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: "" }),
    __metadata("design:type", String)
], Threat.prototype, "element", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: null, type: "longtext" }),
    __metadata("design:type", Object)
], Threat.prototype, "secondElements", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: null, type: "longtext" }),
    __metadata("design:type", Object)
], Threat.prototype, "skills", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: "" }),
    __metadata("design:type", String)
], Threat.prototype, "size", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: "" }),
    __metadata("design:type", String)
], Threat.prototype, "type", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: null, type: "longtext" }),
    __metadata("design:type", Object)
], Threat.prototype, "disturbingPresence", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: null, type: "longtext" }),
    __metadata("design:type", Object)
], Threat.prototype, "senses", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: null, type: "longtext" }),
    __metadata("design:type", Object)
], Threat.prototype, "defenses", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: null, type: "longtext" }),
    __metadata("design:type", Object)
], Threat.prototype, "healthPoints", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: null, type: "longtext" }),
    __metadata("design:type", Object)
], Threat.prototype, "vulnerabilities", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: null, type: "longtext" }),
    __metadata("design:type", Object)
], Threat.prototype, "attributes", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: null, type: "longtext" }),
    __metadata("design:type", Object)
], Threat.prototype, "displacements", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: null, type: "longtext" }),
    __metadata("design:type", Object)
], Threat.prototype, "actions", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: null, type: "longtext" }),
    __metadata("design:type", Object)
], Threat.prototype, "enigma", void 0);
Threat = __decorate([
    (0, typeorm_1.Entity)({ name: "threat" })
], Threat);
exports.Threat = Threat;
