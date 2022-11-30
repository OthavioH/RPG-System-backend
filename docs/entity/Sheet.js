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
exports.Sheet = void 0;
const typeorm_1 = require("typeorm");
let Sheet = class Sheet {
    constructor() {
        this.playerName = "";
        this.profileImageUrl = "";
        this.name = "";
        this.age = 0;
        this.gender = "";
        this.nex = 5;
        this.rank = "";
        this.class = "";
        this.origin = "";
        this.hp = 0;
        this.maxHp = 0;
        this.sanity = 0;
        this.maxSanity = 0;
        this.blockDefense = 0;
        this.dodgeDefense = 0;
        this.physicsResistance = 0;
        this.ballisticResistance = 0;
        this.energyResistance = 0;
        this.bloodResistance = 0;
        this.deathResistance = 0;
        this.knowledgeResistance = 0;
        this.insanityResistance = 0;
    }
    updateData(newSheet) {
        this.name = newSheet.name;
        this.playerName = newSheet.playerName;
        this.profileImageUrl = newSheet.profileImageUrl;
        this.hp = newSheet.hp;
        this.maxHp = newSheet.maxHp;
        this.sanity = newSheet.sanity;
        this.maxSanity = newSheet.maxSanity;
        this.age = newSheet.age;
        this.nex = newSheet.nex;
        this.origin = newSheet.origin;
        this.gender = newSheet.gender;
        this.rank = newSheet.rank;
        this.class = newSheet.class;
        this.effortPoints = newSheet.effortPoints;
        this.maxEffortPoints = newSheet.maxEffortPoints;
        this.blockDefense = newSheet.blockDefense;
        this.passiveDefense = newSheet.passiveDefense;
        this.dodgeDefense = newSheet.dodgeDefense;
        this.attributes = JSON.stringify(newSheet.attributes);
        this.skills = JSON.stringify(newSheet.skills);
        this.abilities = JSON.stringify(newSheet.abilities);
        this.rituals = JSON.stringify(newSheet.rituals);
        this.inventory = JSON.stringify(newSheet.inventory);
        this.weapons = JSON.stringify(newSheet.weapons);
        this.ballisticResistance = newSheet.ballisticResistance;
        this.deathResistance = newSheet.deathResistance;
        this.energyResistance = newSheet.energyResistance;
        this.bloodResistance = newSheet.bloodResistance;
        this.physicsResistance = newSheet.physicsResistance;
        this.insanityResistance = newSheet.insanityResistance;
        this.knowledgeResistance = newSheet.knowledgeResistance;
        this.proficiences = newSheet.proficiences;
        this.notes = newSheet.notes;
    }
    parseArrays() {
        this.skills = JSON.parse(this.skills);
        this.attributes = JSON.parse(this.attributes);
        this.abilities = JSON.parse(this.abilities);
        this.rituals = JSON.parse(this.rituals);
        this.inventory = JSON.parse(this.inventory);
        this.weapons = JSON.parse(this.weapons);
    }
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Sheet.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: "" }),
    __metadata("design:type", String)
], Sheet.prototype, "playerName", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: "" }),
    __metadata("design:type", String)
], Sheet.prototype, "profileImageUrl", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: "" }),
    __metadata("design:type", String)
], Sheet.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: 0 }),
    __metadata("design:type", Number)
], Sheet.prototype, "age", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: "" }),
    __metadata("design:type", String)
], Sheet.prototype, "gender", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: 5 }),
    __metadata("design:type", Number)
], Sheet.prototype, "nex", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: "" }),
    __metadata("design:type", String)
], Sheet.prototype, "rank", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: "" }),
    __metadata("design:type", String)
], Sheet.prototype, "class", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: "" }),
    __metadata("design:type", String)
], Sheet.prototype, "origin", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: 0 }),
    __metadata("design:type", Number)
], Sheet.prototype, "effortPoints", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: 0 }),
    __metadata("design:type", Number)
], Sheet.prototype, "maxEffortPoints", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: null }),
    __metadata("design:type", String)
], Sheet.prototype, "proficiences", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: null, type: "longtext" }),
    __metadata("design:type", String)
], Sheet.prototype, "attributes", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: null, type: "longtext" }),
    __metadata("design:type", String)
], Sheet.prototype, "skills", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: null, type: "longtext" }),
    __metadata("design:type", String)
], Sheet.prototype, "abilities", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: null, type: "longtext" }),
    __metadata("design:type", String)
], Sheet.prototype, "rituals", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: null, type: "longtext" }),
    __metadata("design:type", String)
], Sheet.prototype, "weapons", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: null, type: "longtext" }),
    __metadata("design:type", String)
], Sheet.prototype, "inventory", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: 0 }),
    __metadata("design:type", Number)
], Sheet.prototype, "hp", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: 0 }),
    __metadata("design:type", Number)
], Sheet.prototype, "maxHp", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: 0 }),
    __metadata("design:type", Number)
], Sheet.prototype, "sanity", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: 0 }),
    __metadata("design:type", Number)
], Sheet.prototype, "maxSanity", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: 0 }),
    __metadata("design:type", Number)
], Sheet.prototype, "passiveDefense", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: 0 }),
    __metadata("design:type", Number)
], Sheet.prototype, "blockDefense", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: 0 }),
    __metadata("design:type", Number)
], Sheet.prototype, "dodgeDefense", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: 0 }),
    __metadata("design:type", Number)
], Sheet.prototype, "physicsResistance", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: 0 }),
    __metadata("design:type", Number)
], Sheet.prototype, "ballisticResistance", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: 0 }),
    __metadata("design:type", Number)
], Sheet.prototype, "energyResistance", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: 0 }),
    __metadata("design:type", Number)
], Sheet.prototype, "bloodResistance", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: 0 }),
    __metadata("design:type", Number)
], Sheet.prototype, "deathResistance", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: 0 }),
    __metadata("design:type", Number)
], Sheet.prototype, "knowledgeResistance", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: 0 }),
    __metadata("design:type", Number)
], Sheet.prototype, "insanityResistance", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: null }),
    __metadata("design:type", String)
], Sheet.prototype, "notes", void 0);
Sheet = __decorate([
    (0, typeorm_1.Entity)({ name: "sheets" })
], Sheet);
exports.Sheet = Sheet;
