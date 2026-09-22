# High Roller — full-run model

100 runs per scenario/policy; seeds 1–100; 3 independent samples per rollout candidate.

Engine SHA-256: `36ded503c212a34850397f2da51ce4f410178d30ae4a95f9a00469d4e6445cce`. Model SHA-256: `f6b40fc8a6cb015b593d54e77bd18644375a6cdff88635b002ba0fae54785d8c`.

| Scenario | Policy | Run wins (95% CI) | R1 clear | R2 clear | R3 clear | Runs using reroll | Censored |
|---|---|---|---|---|---|---|---|
| baseline | greedy | 27.0% (19.3%–36.4%) | 93.0% | 69.0% | 27.0% | 0.0% | 0 |
| baseline | spender | 32.0% (23.7%–41.7%) | 93.0% | 71.0% | 32.0% | 61.0% | 0 |
| no-specials | greedy | 0.0% (0.0%–3.7%) | 49.0% | 11.0% | 0.0% | 0.0% | 0 |
| no-specials | spender | 0.0% (0.0%–3.7%) | 49.0% | 11.0% | 0.0% | 0.0% | 0 |
| double-specials | greedy | 88.0% (80.2%–93.0%) | 100.0% | 98.0% | 88.0% | 0.0% | 0 |
| double-specials | spender | 92.0% (85.0%–95.9%) | 100.0% | 99.0% | 92.0% | 100.0% | 0 |
| no-low-bonus | greedy | 29.0% (21.0%–38.5%) | 92.0% | 64.0% | 29.0% | 0.0% | 0 |
| no-low-bonus | spender | 34.0% (25.5%–43.7%) | 92.0% | 67.0% | 34.0% | 65.0% | 0 |
| no-cascade-bonus | greedy | 7.0% (3.4%–13.7%) | 88.0% | 41.0% | 7.0% | 0.0% | 0 |
| no-cascade-bonus | spender | 10.0% (5.5%–17.4%) | 88.0% | 46.0% | 10.0% | 59.0% | 0 |
| coin-rate-5 | greedy | 27.0% (19.3%–36.4%) | 93.0% | 69.0% | 27.0% | 0.0% | 0 |
| coin-rate-5 | spender | 36.0% (27.3%–45.8%) | 93.0% | 71.0% | 36.0% | 92.0% | 0 |
| reroll-cost-2 | greedy | 27.0% (19.3%–36.4%) | 93.0% | 69.0% | 27.0% | 0.0% | 0 |
| reroll-cost-2 | spender | 40.0% (30.9%–49.8%) | 95.0% | 76.0% | 40.0% | 84.0% | 0 |
| eight-moves | greedy | 13.0% (7.8%–21.0%) | 81.0% | 48.0% | 13.0% | 0.0% | 0 |
| eight-moves | spender | 18.0% (11.7%–26.7%) | 81.0% | 50.0% | 18.0% | 41.0% | 0 |
| twelve-moves | greedy | 53.0% (43.3%–62.5%) | 99.0% | 92.0% | 53.0% | 0.0% | 0 |
| twelve-moves | spender | 57.0% (47.2%–66.3%) | 99.0% | 92.0% | 57.0% | 76.0% | 0 |
| targets-minus-20 | greedy | 60.0% (50.2%–69.1%) | 100.0% | 91.0% | 60.0% | 0.0% | 0 |
| targets-minus-20 | spender | 56.0% (46.2%–65.3%) | 100.0% | 90.0% | 56.0% | 60.0% | 0 |
| targets-plus-20 | greedy | 16.0% (10.1%–24.4%) | 88.0% | 52.0% | 16.0% | 0.0% | 0 |
| targets-plus-20 | spender | 22.0% (15.0%–31.1%) | 86.0% | 50.0% | 22.0% | 64.0% | 0 |
| without-column | greedy | 20.0% (13.3%–28.9%) | 94.0% | 63.0% | 20.0% | 0.0% | 0 |
| without-column | spender | 27.0% (19.3%–36.4%) | 94.0% | 66.0% | 27.0% | 63.0% | 0 |
| without-color | greedy | 13.0% (7.8%–21.0%) | 87.0% | 51.0% | 13.0% | 0.0% | 0 |
| without-color | spender | 10.0% (5.5%–17.4%) | 88.0% | 52.0% | 10.0% | 54.0% | 0 |
| without-number | greedy | 13.0% (7.8%–21.0%) | 90.0% | 57.0% | 13.0% | 0.0% | 0 |
| without-number | spender | 14.0% (8.5%–22.1%) | 90.0% | 55.0% | 14.0% | 62.0% | 0 |
| without-bomb | greedy | 16.0% (10.1%–24.4%) | 94.0% | 57.0% | 16.0% | 0.0% | 0 |
| without-bomb | spender | 17.0% (10.9%–25.5%) | 94.0% | 56.0% | 17.0% | 56.0% | 0 |
| without-coin | greedy | 27.0% (19.3%–36.4%) | 93.0% | 69.0% | 27.0% | 0.0% | 0 |
| without-coin | spender | 27.0% (19.3%–36.4%) | 93.0% | 69.0% | 27.0% | 0.0% | 0 |

Round clear rates above use all starting runs as the denominator. Conditional rates and score deficits are in summary.json.

## baseline

### greedy

- Mean 18.49 actions/run; 1.61 waves/action; p99 5, maximum 8.
- 0 rerolls, 0 without an immediate match; 371 coins earned, 0 spent.
- Score shares: match base 43.1%, blast base 24.5%, cascade bonus 27.7%, low-pip bonus 4.7%.
- 11 dead-board shuffles; 0 resolution ceilings.

| Special | Spawned | Triggered | Triggered by another special |
|---|---:|---:|---:|
| column | 625 | 447 | 158 |
| color | 561 | 415 | 137 |
| number | 584 | 422 | 127 |
| bomb | 604 | 455 | 136 |
| coin | 561 | 371 | 162 |
### spender

- Mean 19.05 actions/run; 1.57 waves/action; p99 5, maximum 8.
- 79 rerolls, 50 without an immediate match; 368 coins earned, 237 spent.
- Score shares: match base 42.8%, blast base 24.0%, cascade bonus 28.7%, low-pip bonus 4.6%.
- 13 dead-board shuffles; 0 resolution ceilings.

| Special | Spawned | Triggered | Triggered by another special |
|---|---:|---:|---:|
| column | 642 | 463 | 164 |
| color | 568 | 428 | 147 |
| number | 568 | 412 | 123 |
| bomb | 592 | 447 | 135 |
| coin | 579 | 368 | 153 |

## no-specials

### greedy

- Mean 14.41 actions/run; 1.38 waves/action; p99 4, maximum 6.
- 0 rerolls, 0 without an immediate match; 0 coins earned, 0 spent.
- Score shares: match base 72.9%, blast base 0.0%, cascade bonus 19.0%, low-pip bonus 8.1%.
- 23 dead-board shuffles; 0 resolution ceilings.

| Special | Spawned | Triggered | Triggered by another special |
|---|---:|---:|---:|
| column | 0 | 0 | 0 |
| color | 0 | 0 | 0 |
| number | 0 | 0 | 0 |
| bomb | 0 | 0 | 0 |
| coin | 0 | 0 | 0 |
### spender

- Mean 14.41 actions/run; 1.38 waves/action; p99 4, maximum 6.
- 0 rerolls, 0 without an immediate match; 0 coins earned, 0 spent.
- Score shares: match base 72.9%, blast base 0.0%, cascade bonus 19.0%, low-pip bonus 8.1%.
- 23 dead-board shuffles; 0 resolution ceilings.

| Special | Spawned | Triggered | Triggered by another special |
|---|---:|---:|---:|
| column | 0 | 0 | 0 |
| color | 0 | 0 | 0 |
| number | 0 | 0 | 0 |
| bomb | 0 | 0 | 0 |
| coin | 0 | 0 | 0 |

## double-specials

### greedy

- Mean 12.75 actions/run; 1.93 waves/action; p99 6, maximum 10.
- 0 rerolls, 0 without an immediate match; 1078 coins earned, 0 spent.
- Score shares: match base 24.2%, blast base 33.5%, cascade bonus 39.8%, low-pip bonus 2.6%.
- 6 dead-board shuffles; 0 resolution ceilings.

| Special | Spawned | Triggered | Triggered by another special |
|---|---:|---:|---:|
| column | 1623 | 1224 | 700 |
| color | 1579 | 1171 | 666 |
| number | 1570 | 1160 | 700 |
| bomb | 1566 | 1197 | 711 |
| coin | 1511 | 1078 | 710 |
### spender

- Mean 15.31 actions/run; 1.66 waves/action; p99 6, maximum 9.
- 282 rerolls, 198 without an immediate match; 1127 coins earned, 846 spent.
- Score shares: match base 25.9%, blast base 34.0%, cascade bonus 37.4%, low-pip bonus 2.6%.
- 7 dead-board shuffles; 0 resolution ceilings.

| Special | Spawned | Triggered | Triggered by another special |
|---|---:|---:|---:|
| column | 1591 | 1197 | 697 |
| color | 1564 | 1165 | 655 |
| number | 1586 | 1185 | 692 |
| bomb | 1604 | 1203 | 669 |
| coin | 1594 | 1127 | 743 |

## no-low-bonus

### greedy

- Mean 18.12 actions/run; 1.62 waves/action; p99 5, maximum 8.
- 0 rerolls, 0 without an immediate match; 387 coins earned, 0 spent.
- Score shares: match base 45.0%, blast base 25.3%, cascade bonus 29.7%, low-pip bonus 0.0%.
- 16 dead-board shuffles; 0 resolution ceilings.

| Special | Spawned | Triggered | Triggered by another special |
|---|---:|---:|---:|
| column | 624 | 452 | 158 |
| color | 543 | 406 | 130 |
| number | 574 | 419 | 139 |
| bomb | 595 | 445 | 146 |
| coin | 573 | 387 | 167 |
### spender

- Mean 19.03 actions/run; 1.57 waves/action; p99 5, maximum 8.
- 81 rerolls, 60 without an immediate match; 363 coins earned, 243 spent.
- Score shares: match base 44.8%, blast base 25.0%, cascade bonus 30.2%, low-pip bonus 0.0%.
- 11 dead-board shuffles; 0 resolution ceilings.

| Special | Spawned | Triggered | Triggered by another special |
|---|---:|---:|---:|
| column | 623 | 457 | 162 |
| color | 564 | 426 | 130 |
| number | 562 | 405 | 131 |
| bomb | 600 | 442 | 141 |
| coin | 579 | 363 | 161 |

## no-cascade-bonus

### greedy

- Mean 18.33 actions/run; 1.58 waves/action; p99 5, maximum 10.
- 0 rerolls, 0 without an immediate match; 389 coins earned, 0 spent.
- Score shares: match base 60.2%, blast base 33.4%, cascade bonus 0.0%, low-pip bonus 6.4%.
- 9 dead-board shuffles; 0 resolution ceilings.

| Special | Spawned | Triggered | Triggered by another special |
|---|---:|---:|---:|
| column | 538 | 414 | 136 |
| color | 525 | 406 | 131 |
| number | 527 | 399 | 122 |
| bomb | 562 | 429 | 142 |
| coin | 548 | 389 | 157 |
### spender

- Mean 19.51 actions/run; 1.54 waves/action; p99 5, maximum 9.
- 79 rerolls, 56 without an immediate match; 365 coins earned, 237 spent.
- Score shares: match base 61.0%, blast base 32.6%, cascade bonus 0.0%, low-pip bonus 6.4%.
- 13 dead-board shuffles; 0 resolution ceilings.

| Special | Spawned | Triggered | Triggered by another special |
|---|---:|---:|---:|
| column | 564 | 424 | 140 |
| color | 532 | 406 | 135 |
| number | 551 | 426 | 141 |
| bomb | 564 | 416 | 138 |
| coin | 542 | 365 | 153 |

## coin-rate-5

### greedy

- Mean 18.49 actions/run; 1.61 waves/action; p99 5, maximum 8.
- 0 rerolls, 0 without an immediate match; 931 coins earned, 0 spent.
- Score shares: match base 43.1%, blast base 24.5%, cascade bonus 27.7%, low-pip bonus 4.7%.
- 11 dead-board shuffles; 0 resolution ceilings.

| Special | Spawned | Triggered | Triggered by another special |
|---|---:|---:|---:|
| column | 625 | 447 | 158 |
| color | 561 | 415 | 137 |
| number | 584 | 422 | 127 |
| bomb | 604 | 455 | 136 |
| coin | 1409 | 931 | 407 |
### spender

- Mean 20.42 actions/run; 1.46 waves/action; p99 5, maximum 8.
- 246 rerolls, 161 without an immediate match; 917 coins earned, 738 spent.
- Score shares: match base 44.3%, blast base 24.1%, cascade bonus 27.1%, low-pip bonus 4.6%.
- 9 dead-board shuffles; 0 resolution ceilings.

| Special | Spawned | Triggered | Triggered by another special |
|---|---:|---:|---:|
| column | 640 | 459 | 160 |
| color | 553 | 394 | 133 |
| number | 581 | 432 | 137 |
| bomb | 598 | 452 | 146 |
| coin | 1411 | 917 | 385 |

## reroll-cost-2

### greedy

- Mean 18.49 actions/run; 1.61 waves/action; p99 5, maximum 8.
- 0 rerolls, 0 without an immediate match; 371 coins earned, 0 spent.
- Score shares: match base 43.1%, blast base 24.5%, cascade bonus 27.7%, low-pip bonus 4.7%.
- 11 dead-board shuffles; 0 resolution ceilings.

| Special | Spawned | Triggered | Triggered by another special |
|---|---:|---:|---:|
| column | 625 | 447 | 158 |
| color | 561 | 415 | 137 |
| number | 584 | 422 | 127 |
| bomb | 604 | 455 | 136 |
| coin | 561 | 371 | 162 |
### spender

- Mean 20.16 actions/run; 1.53 waves/action; p99 5, maximum 8.
- 158 rerolls, 108 without an immediate match; 404 coins earned, 316 spent.
- Score shares: match base 43.0%, blast base 24.4%, cascade bonus 28.1%, low-pip bonus 4.6%.
- 10 dead-board shuffles; 0 resolution ceilings.

| Special | Spawned | Triggered | Triggered by another special |
|---|---:|---:|---:|
| column | 657 | 485 | 164 |
| color | 580 | 432 | 144 |
| number | 595 | 448 | 142 |
| bomb | 642 | 479 | 158 |
| coin | 598 | 404 | 184 |

## eight-moves

### greedy

- Mean 14.35 actions/run; 1.60 waves/action; p99 5, maximum 8.
- 0 rerolls, 0 without an immediate match; 277 coins earned, 0 spent.
- Score shares: match base 43.1%, blast base 24.5%, cascade bonus 27.7%, low-pip bonus 4.6%.
- 6 dead-board shuffles; 0 resolution ceilings.

| Special | Spawned | Triggered | Triggered by another special |
|---|---:|---:|---:|
| column | 509 | 353 | 127 |
| color | 457 | 323 | 105 |
| number | 457 | 325 | 98 |
| bomb | 496 | 369 | 109 |
| coin | 436 | 277 | 118 |
### spender

- Mean 14.70 actions/run; 1.58 waves/action; p99 5, maximum 8.
- 49 rerolls, 30 without an immediate match; 274 coins earned, 147 spent.
- Score shares: match base 42.7%, blast base 23.9%, cascade bonus 28.8%, low-pip bonus 4.5%.
- 6 dead-board shuffles; 0 resolution ceilings.

| Special | Spawned | Triggered | Triggered by another special |
|---|---:|---:|---:|
| column | 516 | 361 | 133 |
| color | 476 | 340 | 110 |
| number | 453 | 314 | 95 |
| bomb | 489 | 365 | 114 |
| coin | 448 | 274 | 116 |

## twelve-moves

### greedy

- Mean 22.29 actions/run; 1.61 waves/action; p99 5, maximum 8.
- 0 rerolls, 0 without an immediate match; 440 coins earned, 0 spent.
- Score shares: match base 43.2%, blast base 24.2%, cascade bonus 27.9%, low-pip bonus 4.7%.
- 14 dead-board shuffles; 0 resolution ceilings.

| Special | Spawned | Triggered | Triggered by another special |
|---|---:|---:|---:|
| column | 719 | 529 | 182 |
| color | 667 | 504 | 168 |
| number | 676 | 496 | 162 |
| bomb | 702 | 534 | 162 |
| coin | 646 | 440 | 188 |
### spender

- Mean 22.84 actions/run; 1.56 waves/action; p99 5, maximum 8.
- 102 rerolls, 62 without an immediate match; 436 coins earned, 306 spent.
- Score shares: match base 42.9%, blast base 24.2%, cascade bonus 28.3%, low-pip bonus 4.6%.
- 16 dead-board shuffles; 0 resolution ceilings.

| Special | Spawned | Triggered | Triggered by another special |
|---|---:|---:|---:|
| column | 737 | 533 | 186 |
| color | 650 | 502 | 177 |
| number | 651 | 482 | 148 |
| bomb | 692 | 532 | 160 |
| coin | 667 | 436 | 179 |

## targets-minus-20

### greedy

- Mean 18.45 actions/run; 1.60 waves/action; p99 5, maximum 8.
- 0 rerolls, 0 without an immediate match; 368 coins earned, 0 spent.
- Score shares: match base 43.6%, blast base 23.8%, cascade bonus 27.9%, low-pip bonus 4.7%.
- 13 dead-board shuffles; 0 resolution ceilings.

| Special | Spawned | Triggered | Triggered by another special |
|---|---:|---:|---:|
| column | 629 | 453 | 144 |
| color | 548 | 388 | 111 |
| number | 549 | 378 | 118 |
| bomb | 621 | 438 | 148 |
| coin | 591 | 368 | 148 |
### spender

- Mean 18.72 actions/run; 1.58 waves/action; p99 5, maximum 8.
- 72 rerolls, 47 without an immediate match; 362 coins earned, 216 spent.
- Score shares: match base 42.4%, blast base 24.0%, cascade bonus 28.9%, low-pip bonus 4.6%.
- 12 dead-board shuffles; 0 resolution ceilings.

| Special | Spawned | Triggered | Triggered by another special |
|---|---:|---:|---:|
| column | 642 | 456 | 155 |
| color | 577 | 413 | 128 |
| number | 544 | 377 | 130 |
| bomb | 624 | 439 | 155 |
| coin | 587 | 362 | 152 |

## targets-plus-20

### greedy

- Mean 18.27 actions/run; 1.61 waves/action; p99 5, maximum 10.
- 0 rerolls, 0 without an immediate match; 387 coins earned, 0 spent.
- Score shares: match base 42.6%, blast base 24.1%, cascade bonus 28.7%, low-pip bonus 4.6%.
- 7 dead-board shuffles; 0 resolution ceilings.

| Special | Spawned | Triggered | Triggered by another special |
|---|---:|---:|---:|
| column | 571 | 421 | 147 |
| color | 552 | 423 | 143 |
| number | 550 | 410 | 128 |
| bomb | 579 | 445 | 138 |
| coin | 556 | 387 | 168 |
### spender

- Mean 18.63 actions/run; 1.56 waves/action; p99 5, maximum 8.
- 85 rerolls, 65 without an immediate match; 374 coins earned, 255 spent.
- Score shares: match base 42.7%, blast base 22.9%, cascade bonus 29.8%, low-pip bonus 4.5%.
- 11 dead-board shuffles; 0 resolution ceilings.

| Special | Spawned | Triggered | Triggered by another special |
|---|---:|---:|---:|
| column | 553 | 411 | 135 |
| color | 551 | 415 | 139 |
| number | 530 | 400 | 128 |
| bomb | 531 | 398 | 126 |
| coin | 553 | 374 | 152 |

## without-column

### greedy

- Mean 19.11 actions/run; 1.59 waves/action; p99 5, maximum 8.
- 0 rerolls, 0 without an immediate match; 358 coins earned, 0 spent.
- Score shares: match base 48.2%, blast base 19.4%, cascade bonus 27.2%, low-pip bonus 5.1%.
- 19 dead-board shuffles; 0 resolution ceilings.

| Special | Spawned | Triggered | Triggered by another special |
|---|---:|---:|---:|
| column | 0 | 0 | 0 |
| color | 566 | 401 | 95 |
| number | 511 | 346 | 84 |
| bomb | 521 | 365 | 93 |
| coin | 547 | 358 | 112 |
### spender

- Mean 20.05 actions/run; 1.55 waves/action; p99 5, maximum 8.
- 86 rerolls, 57 without an immediate match; 381 coins earned, 258 spent.
- Score shares: match base 47.2%, blast base 19.5%, cascade bonus 28.3%, low-pip bonus 5.0%.
- 21 dead-board shuffles; 0 resolution ceilings.

| Special | Spawned | Triggered | Triggered by another special |
|---|---:|---:|---:|
| column | 0 | 0 | 0 |
| color | 568 | 412 | 100 |
| number | 545 | 376 | 94 |
| bomb | 545 | 385 | 102 |
| coin | 577 | 381 | 123 |

## without-color

### greedy

- Mean 19.16 actions/run; 1.51 waves/action; p99 4, maximum 7.
- 0 rerolls, 0 without an immediate match; 320 coins earned, 0 spent.
- Score shares: match base 53.9%, blast base 16.0%, cascade bonus 24.5%, low-pip bonus 5.7%.
- 18 dead-board shuffles; 0 resolution ceilings.

| Special | Spawned | Triggered | Triggered by another special |
|---|---:|---:|---:|
| column | 506 | 356 | 79 |
| color | 0 | 0 | 0 |
| number | 460 | 325 | 74 |
| bomb | 454 | 303 | 57 |
| coin | 499 | 320 | 91 |
### spender

- Mean 19.83 actions/run; 1.49 waves/action; p99 5, maximum 7.
- 72 rerolls, 46 without an immediate match; 329 coins earned, 216 spent.
- Score shares: match base 53.2%, blast base 15.6%, cascade bonus 25.5%, low-pip bonus 5.6%.
- 20 dead-board shuffles; 0 resolution ceilings.

| Special | Spawned | Triggered | Triggered by another special |
|---|---:|---:|---:|
| column | 509 | 354 | 78 |
| color | 0 | 0 | 0 |
| number | 460 | 330 | 82 |
| bomb | 465 | 299 | 56 |
| coin | 506 | 329 | 92 |

## without-number

### greedy

- Mean 19.22 actions/run; 1.53 waves/action; p99 5, maximum 8.
- 0 rerolls, 0 without an immediate match; 346 coins earned, 0 spent.
- Score shares: match base 49.3%, blast base 20.4%, cascade bonus 24.8%, low-pip bonus 5.5%.
- 23 dead-board shuffles; 0 resolution ceilings.

| Special | Spawned | Triggered | Triggered by another special |
|---|---:|---:|---:|
| column | 548 | 391 | 106 |
| color | 483 | 349 | 80 |
| number | 0 | 0 | 0 |
| bomb | 513 | 354 | 90 |
| coin | 533 | 346 | 114 |
### spender

- Mean 19.87 actions/run; 1.47 waves/action; p99 5, maximum 8.
- 75 rerolls, 57 without an immediate match; 333 coins earned, 225 spent.
- Score shares: match base 49.9%, blast base 20.1%, cascade bonus 24.6%, low-pip bonus 5.4%.
- 26 dead-board shuffles; 0 resolution ceilings.

| Special | Spawned | Triggered | Triggered by another special |
|---|---:|---:|---:|
| column | 543 | 380 | 95 |
| color | 482 | 342 | 66 |
| number | 0 | 0 | 0 |
| bomb | 495 | 343 | 89 |
| coin | 536 | 333 | 104 |

## without-bomb

### greedy

- Mean 18.88 actions/run; 1.58 waves/action; p99 5, maximum 12.
- 0 rerolls, 0 without an immediate match; 345 coins earned, 0 spent.
- Score shares: match base 48.2%, blast base 18.5%, cascade bonus 28.0%, low-pip bonus 5.3%.
- 12 dead-board shuffles; 0 resolution ceilings.

| Special | Spawned | Triggered | Triggered by another special |
|---|---:|---:|---:|
| column | 546 | 393 | 86 |
| color | 501 | 364 | 92 |
| number | 488 | 342 | 95 |
| bomb | 0 | 0 | 0 |
| coin | 535 | 345 | 104 |
### spender

- Mean 19.45 actions/run; 1.52 waves/action; p99 5, maximum 12.
- 75 rerolls, 61 without an immediate match; 350 coins earned, 225 spent.
- Score shares: match base 48.8%, blast base 18.4%, cascade bonus 27.5%, low-pip bonus 5.3%.
- 16 dead-board shuffles; 0 resolution ceilings.

| Special | Spawned | Triggered | Triggered by another special |
|---|---:|---:|---:|
| column | 544 | 379 | 82 |
| color | 506 | 368 | 95 |
| number | 478 | 343 | 93 |
| bomb | 0 | 0 | 0 |
| coin | 541 | 350 | 112 |

## without-coin

### greedy

- Mean 18.49 actions/run; 1.61 waves/action; p99 5, maximum 8.
- 0 rerolls, 0 without an immediate match; 0 coins earned, 0 spent.
- Score shares: match base 43.1%, blast base 24.5%, cascade bonus 27.7%, low-pip bonus 4.7%.
- 11 dead-board shuffles; 0 resolution ceilings.

| Special | Spawned | Triggered | Triggered by another special |
|---|---:|---:|---:|
| column | 625 | 447 | 158 |
| color | 561 | 415 | 137 |
| number | 584 | 422 | 127 |
| bomb | 604 | 455 | 136 |
| coin | 0 | 0 | 0 |
### spender

- Mean 18.49 actions/run; 1.61 waves/action; p99 5, maximum 8.
- 0 rerolls, 0 without an immediate match; 0 coins earned, 0 spent.
- Score shares: match base 43.1%, blast base 24.5%, cascade bonus 27.7%, low-pip bonus 4.7%.
- 11 dead-board shuffles; 0 resolution ceilings.

| Special | Spawned | Triggered | Triggered by another special |
|---|---:|---:|---:|
| column | 625 | 447 | 158 |
| color | 561 | 415 | 137 |
| number | 584 | 422 | 127 |
| bomb | 604 | 455 | 136 |
| coin | 0 | 0 | 0 |

## Paired comparisons

| Scenario | Policy | Comparator | Win-rate change | Approx. 95% interval |
|---|---|---|---|---|
| no-specials | greedy | baseline, same policy | -27.0 pp | -35.7 to -18.3 pp |
| no-specials | spender | baseline, same policy | -32.0 pp | -41.2 to -22.8 pp |
| double-specials | greedy | baseline, same policy | 61.0 pp | 50.6 to 71.4 pp |
| double-specials | spender | baseline, same policy | 60.0 pp | 50.0 to 70.0 pp |
| no-low-bonus | greedy | baseline, same policy | 2.0 pp | -8.4 to 12.4 pp |
| no-low-bonus | spender | baseline, same policy | 2.0 pp | -8.4 to 12.4 pp |
| no-cascade-bonus | greedy | baseline, same policy | -20.0 pp | -30.0 to -10.0 pp |
| no-cascade-bonus | spender | baseline, same policy | -22.0 pp | -33.3 to -10.7 pp |
| coin-rate-5 | greedy | baseline, same policy | 0.0 pp | 0.0 to 0.0 pp |
| coin-rate-5 | spender | baseline, same policy | 4.0 pp | -7.1 to 15.1 pp |
| reroll-cost-2 | greedy | baseline, same policy | 0.0 pp | 0.0 to 0.0 pp |
| reroll-cost-2 | spender | baseline, same policy | 8.0 pp | -3.7 to 19.7 pp |
| eight-moves | greedy | baseline, same policy | -14.0 pp | -20.8 to -7.2 pp |
| eight-moves | spender | baseline, same policy | -14.0 pp | -20.8 to -7.2 pp |
| twelve-moves | greedy | baseline, same policy | 26.0 pp | 17.4 to 34.6 pp |
| twelve-moves | spender | baseline, same policy | 25.0 pp | 16.5 to 33.5 pp |
| targets-minus-20 | greedy | baseline, same policy | 33.0 pp | 19.6 to 46.4 pp |
| targets-minus-20 | spender | baseline, same policy | 24.0 pp | 11.5 to 36.5 pp |
| targets-plus-20 | greedy | baseline, same policy | -11.0 pp | -21.0 to -1.0 pp |
| targets-plus-20 | spender | baseline, same policy | -10.0 pp | -20.6 to 0.6 pp |
| without-column | greedy | baseline, same policy | -7.0 pp | -17.9 to 3.9 pp |
| without-column | spender | baseline, same policy | -5.0 pp | -17.3 to 7.3 pp |
| without-color | greedy | baseline, same policy | -14.0 pp | -24.1 to -3.9 pp |
| without-color | spender | baseline, same policy | -22.0 pp | -32.3 to -11.7 pp |
| without-number | greedy | baseline, same policy | -14.0 pp | -25.2 to -2.8 pp |
| without-number | spender | baseline, same policy | -18.0 pp | -29.3 to -6.7 pp |
| without-bomb | greedy | baseline, same policy | -11.0 pp | -21.0 to -1.0 pp |
| without-bomb | spender | baseline, same policy | -15.0 pp | -25.6 to -4.4 pp |
| without-coin | greedy | baseline, same policy | 0.0 pp | 0.0 to 0.0 pp |
| without-coin | spender | baseline, same policy | -5.0 pp | -15.2 to 5.2 pp |
| baseline | spender | greedy | 5.0 pp | -5.2 to 15.2 pp |

## Limits

- Agent policies are not human skill estimates.
- Only visible information reaches policies; rollout samples use independent RNG.
- Matched seeds start equally, but streams diverge after different actions.
- Confidence intervals describe seed sampling under these fixed policies.
- No purchases or future content are simulated before those mechanics exist.
- Pacing is reported in moves/actions/waves, not unmeasured human minutes.

Censored runs are retained in the denominator and are not counted as wins. Any nonzero censorship or resolution ceiling needs investigation before drawing balance conclusions. Sensitivity results are screening evidence, not automatic tuning instructions; confirm changes on held-out seeds.
